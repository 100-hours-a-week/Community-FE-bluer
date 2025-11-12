import { getState } from "../lib/store.js";
import { showToast } from "../lib/utils.js";
import { apiManager } from "../lib/api/apiManager.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { $ } from "../lib/dom.js";

function PostEdit({ $target, initialState = {}, moveTo }) {
  this.$target = $target;
  this.state = {
    ...initialState,
    title: "",
    content: "",
  };
  this.moveTo = moveTo;

  this.element = document.createElement("div");
  this.element.className = "post-add-page";

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
  };

  this.render = () => {
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
              value=${this.state.title}
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
            <input type="file" accept="image/png, image/jpeg" />
          </div>
          <div class="button-container">
            <button class="submit-button" type="submit">수정하기</button>
          </div>
        </form>
      </div>
    `;

    this.element.innerHTML = htmlString;
    this.$target.appendChild(this.element);
  };

  this.getPost = async postId => {
    try {
      const response = await apiManager.getPost(postId);

      if (response.status === StatusCode.OK) {
        this.setState({
          title: response.data.title,
          content: response.data.content,
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

  this.modifyPost = async () => {
    try {
      const { title, content } = this.state;
      const { history } = getState();
      const { postId } = history[history.length - 1].query;

      const response = await apiManager.updatePost({
        postId,
        title,
        content,
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
    const $form = $("form");

    $form.addEventListener("submit", this.handleSubmit);
    $form.addEventListener("input", this.handleInput);
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
