import { $ } from "../lib/dom.js";
import { apiManager } from "../lib/api/apiManager.js";
import { showToast } from "../lib/utils.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { uploadToImageBucket } from "../lib/external/imageBucket.js";

function PostCreate({ $target, initialState = {}, moveTo }) {
  this.$target = $target;
  this.state = {
    ...initialState,
    title: null,
    content: null,
    postImageUrl: null,
    file: null,
  };
  this.moveTo = moveTo;

  this.element = document.createElement("div");
  this.element.className = "post-add-page page-layout";
  this.$form = null;
  this.$fileInput = null;

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
  };

  this.render = () => {
    const htmlString = `
      <form>
        <div class="form-item">
          <div class="post-title-input-container">
            <input
              class="form-item-post-title"
              name="title"
              placeholder="제목을 입력해 주세요."
              maxlength="26"
            />
            <span class="title-count">${this.state.title?.length || 0}/26</span>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-content-area">
            <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-item">
          <div class="divider"></div>
          <label>이미지</label>
          <input class="add-photo-file-input block" type="file" accept="image/png, image/jpeg" />
        </div>
        <div class="button-container">
          <button class="submit-button" type="submit" disabled>완료</button>
        </div>
      </form>
    `;

    this.element.innerHTML = htmlString;
    this.$target.appendChild(this.element);
    this.$form = $("form");
    this.$fileInput = $(".add-photo-file-input", this.$userInfoPage);
  };

  this.addPost = async () => {
    try {
      let imageUrl = null;

      if (this.state.file) {
        imageUrl = await uploadToImageBucket(this.state.file);
      }
      const { title, content } = this.state;

      const response = await apiManager.addPost({
        title,
        content,
        imageUrl,
      });

      if (response.status === StatusCode.CREATED) {
        showToast("추가 완료");
        setTimeout(() => {
          this.moveTo("/posts");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  this.handleSubmit = event => {
    event.preventDefault();

    this.addPost();
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
    if (name === "title") {
      const $titleCount = $(".title-count");

      $titleCount.textContent = `${value.length ?? 0}/26`;
    }
    const hasInput =
      this.state.title?.length > 0 && this.state.content?.length > 0;
    const $button = $(".submit-button", this.element);

    $button.disabled = !hasInput;
    $button.classList.toggle("active", hasInput);
  };

  this.handleChangeFileInput = event => {
    const file = event.target.files[0];

    if (this.state.postImageUrl) {
      URL.revokeObjectURL(this.state.postImageUrl);
    }

    if (file) {
      const blobUrl = URL.createObjectURL(file);

      this.setState({ postImageUrl: blobUrl, file });
    } else {
      this.setState({ postImageUrl: null, file: null });
    }
  };

  this.bindEvents = () => {
    this.$form.addEventListener("submit", this.handleSubmit);
    this.$form.addEventListener("input", this.handleInput);
    this.$fileInput.addEventListener("change", this.handleChangeFileInput);
  };

  this.cleanUp = () => {
    this.$form.removeEventListener("submit", this.handleSubmit);
    this.$form.removeEventListener("input", this.handleInput);
    this.$fileInput.removeEventListener("change", this.handleChangeFileInput);
    if (this.state.postImageUrl) {
      URL.revokeObjectURL(this.state.postImageUrl);
      this.state.postImageUrl = null;
    }
    this.state.file = null;
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default PostCreate;
