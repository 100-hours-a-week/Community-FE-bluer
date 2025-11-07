function ChangePassword({ $target, initialState = {} }) {
  this.target = $target;
  this.state = { ...initialState };

  this.$element = document.createElement("div");
  this.$element.className = "user-info-page";

  this.render = () => {
    const htmlString = `
        <h2 class="page-title big bold">비밀번호 수정</h2>
        <div class="signup-form-container password-check__change-password">
          <form>
            <ul class="form-input-list">
              <li class="input-container">
                <label for="password">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  />
                <span class='error-message password'><span>
              </li>

              <li class="input-container">
                <label for="password">비밀번호</label>
                <input type="password" name="password-check" placeholder="비밀번호를 한번 더 입력하세요" />
                <span class="error-message password-check"></span>
              </li>
            </ul>
            <button class="submit-button signup-button" type="submit">
              수정하기
            </button>
          </form>
        </div>
    `;

    this.$element.innerHTML = htmlString;
    this.target.appendChild(this.$element);
  };

  this.bindEvents = () => {
    // event 연결해주기
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
}

export default ChangePassword;
