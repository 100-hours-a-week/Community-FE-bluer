import { DUMMY_POSTS } from "../lib/constants.js";
import { getState } from "../lib/store.js";

function PostEdit({ $target, initialState = {} }) {
  this.$target = $target;
  this.state = {
    ...initialState,
    id: null,
    title: "",
    content: "",
    imageUrl: null,
  };
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
            <label>제목 *</label>
            <input
              class="form-item-post-title bold"
              name="title"
              placeholder="제목을 입력해 주세요. (최대 26글자)"
              maxlength="26"
              value=${this.state.title}
            />
          </div>
          <div class="form-item">
            <label>내용 *</label>
            <div class="form-item-content-area">
              <textarea placeholder="내용을 입력해주세요.">${this.state.content}</textarea>
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

  this.bindEvents = () => {
    // event 연결해주기
  };

  this.init = () => {
    const postId =
      getState().history[getState().history.length - 1].query.postId;
    const post = DUMMY_POSTS.find(post => post.id === postId);

    this.setState({ id: post.id, title: post.title, content: post.content });
    this.render();
    this.bindEvents();
  };
}

export default PostEdit;
