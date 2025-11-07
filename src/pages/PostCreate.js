function PostCreate({ $target, initialState = {} }) {
  this.$target = $target;
  this.state = { ...initialState };
  this.element = document.createElement("div");
  this.element.className = "post-add-page";

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
            <textarea placeholder="내용을 입력해주세요."></textarea>
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

  this.bindEvents = () => {
    // event 연결해주기
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
}

export default PostCreate;
