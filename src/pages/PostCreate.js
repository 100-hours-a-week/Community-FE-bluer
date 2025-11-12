import { $ } from "../lib/dom.js";
import { apiManager } from "../lib/api/apiManager.js";
import { showToast } from "../lib/utils.js";
import { StatusCode } from "../lib/api/statusCode.js";

function PostCreate({ $target, initialState = {}, moveTo }) {
  this.$target = $target;
  this.state = { ...initialState, title: "", content: "" };
  this.moveTo = moveTo;

  this.element = document.createElement("div");
  this.element.className = "post-add-page";

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
  };

  this.render = () => {
    const htmlString = `
      <h1 class="page-title bold">게시글 작성</h1>
      <form>
        <div class="form-item">
          <label>제목 *</label>
          <input
            class="form-item-post-title bold"
            name="title"
            placeholder="제목을 입력해 주세요. (최대 26글자)"
            maxlength="26"
          />
        </div>
        <div class="form-item">
          <label>내용 *</label>
          <div class="form-item-content-area">
            <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-item">
          <label>이미지</label>
          <input type="file" accept="image/png, image/jpeg" />
        </div>
        <div class="button-container">
          <button class="submit-button" type="submit">완료</button>
        </div>
      </form>
    `;

    this.element.innerHTML = htmlString;
    this.$target.appendChild(this.element);
  };

  this.addPost = async () => {
    try {
      const { title, content } = this.state;

      const response = await apiManager.addPost({
        title,
        content,
      });

      if (response.status === StatusCode.CREATED) {
        showToast("추가 완료");
        setTimeout(() => {
          this.moveTo("post-list");
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
  };

  this.bindEvents = () => {
    // event 연결해주기
    const $form = $("form");

    $form.addEventListener("submit", this.handleSubmit);
    $form.addEventListener("input", this.handleInput);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
}

export default PostCreate;
