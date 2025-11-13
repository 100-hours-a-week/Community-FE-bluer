import { getState } from "../lib/store.js";
import { showToast } from "../lib/utils.js";
import { apiManager } from "../lib/api/apiManager.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { $ } from "../lib/dom.js";
import { uploadToImageBucket } from "../lib/external/imageBucket.js";

function PostEdit({ $target, initialState = {}, moveTo }) {
  this.$target = $target;
  this.state = {
    ...initialState,
    title: null,
    content: null,
    postImageUrl: null,
    selectedFileName: "",
    file: null,
  };
  this.moveTo = moveTo;

  this.element = document.createElement("div");
  this.element.className = "post-add-page";

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
  };

  this.render = () => {
    const fileIndicatorText =
      this.state.selectedFileName ||
      this.state.postImageUrl ||
      "선택된 파일 없음";

    const htmlString = `
      <div class="post-add-page">
        <h1 class="page-title bold">게시글 수정</h1>
        <form>
          <div class="form-item">
            <label for="title">제목 *</label>
            <input
              class="form-item-post-title bold"
              name="title"
              placeholder="제목을 입력해 주세요. (최대 26글자)"
              maxlength="26"
              value="${this.state.title ?? ""}"
            />
          </div>
          <div class="form-item">
            <label for="content">내용 *</label>
            <div class="form-item-content-area">
              <textarea name="content" placeholder="내용을 입력해주세요.">${this.state.content}</textarea>
              <span class="error-message"></span>
            </div>
          </div>
          <div class="form-item">
            <label>이미지</label>
            <div class="form-item-file-input">
              <button type="button" class="file-input-button">파일 선택</button>
              <input
                class="post-image-input none"
                type="file"
                accept="image/png, image/jpeg"
              />
              <span class="file-input-selected-text">${fileIndicatorText}</span>
            </div>
          </div>
          <div class="button-container">
            <button class="submit-button" type="submit">수정하기</button>
          </div>
        </form>
      </div>
    `;

    this.element.innerHTML = htmlString;
    this.$target.appendChild(this.element);

    this.$fileInput = $(".post-image-input", this.element);
    this.$fileStatusText = $(".file-input-selected-text", this.element);
  };

  this.getPost = async postId => {
    try {
      const response = await apiManager.getPost(postId);

      if (response.status === StatusCode.OK) {
        this.setState({
          title: response.data.title,
          content: response.data.content,
          postImageUrl:
            response.data.postImageUrl ?? response.data.imageUrl ?? null,
        });
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    if (this.state[name] !== undefined) {
      this.setState({ [name]: value });
    }
  };

  this.handleFileChange = event => {
    const file = event.target.files?.[0] ?? null;
    const nextSelectedName = file?.name ?? "";

    this.setState({ selectedFileName: nextSelectedName, file });

    if (this.$fileStatusText) {
      this.$fileStatusText.textContent =
        nextSelectedName || this.state.postImageUrl || "선택된 파일 없음";
    }
  };

  this.modifyPost = async () => {
    try {
      const { title, content, file, postImageUrl } = this.state;
      const { history } = getState();
      const { postId } = history[history.length - 1].query;

      let nextImageUrl = postImageUrl;

      if (file) {
        nextImageUrl = await uploadToImageBucket(file);
      }

      const response = await apiManager.updatePost({
        postId,
        title,
        content,
        imageUrl: nextImageUrl,
      });

      if (response.status === StatusCode.OK) {
        showToast("수정 완료");
        setTimeout(() => {
          this.moveTo("post-detail", { postId });
        }, 500);
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleSubmit = event => {
    event.preventDefault();

    this.modifyPost();
  };

  this.bindEvents = () => {
    const $form = $("form", this.element);
    const $fileInputButton = $(".file-input-button", this.element);

    if (!$form) {
      return;
    }

    $form.addEventListener("submit", this.handleSubmit);
    $form.addEventListener("input", this.handleInput);
    $fileInputButton?.addEventListener("click", () => {
      this.$fileInput?.click();
    });
    this.$fileInput?.addEventListener("change", this.handleFileChange);
  };

  this.init = async () => {
    const { history } = getState();
    const { postId } = history[history.length - 1].query;

    await this.getPost(postId);

    this.render();
    this.bindEvents();
  };
}

export default PostEdit;
