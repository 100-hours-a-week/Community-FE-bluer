import { $ } from "../utils/index.js";

function Login({ $target, initialState }) {
  this.target = $target;
  this.state = { ...initialState, disabled: true, email: "", password: "" };
  this.$loginPage = document.createElement("div");
  this.$loginPage.classList.add("login-page");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.handleSubmit = () => {
    try {
      // TODO: 로그인 API 요청
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  this.render = () => {
    this.$loginPage.innerHTML = `
      <div class="login-container">
        <h2 class="login-title">로그인</h2>
        <div>
          <form>
            <div class="input-container">
              <label for="email">이메일</label>
              <input class="input-email" type="email" name="email" placeholder="이메일을 입력하세요" required>
            </div>
            <div class="input-container">
              <label for="password">비밀번호</label>
              <input class="input-password" type="password" name="password" placeholder="비밀번호를 입력하세요" required/>
            </div>
            
            <button type="submit" class="submit-button" disabled=${this.state.disabled}>로그인</button>
          </form>
          <div class="signup-container">
            <a href="/signup" >회원가입</a>
          </div>
        </div>
    `;

    this.target.appendChild(this.$loginPage);
  };

  this.validateForm = () => {
    const { email, password } = this.state;
    // todo: 이메일 정규식 검사
    const isValidEmail = email => true;
    // todo: password 정규식 검사
    const isValidPassword = password => password.length >= 8;

    if (isValidEmail(email) && isValidPassword(password)) {
      this.setState({ ...this.state, disabled: false });
    } else {
      this.setState({ ...this.state, disabled: true });
    }
  };

  this.handleInput = event => {
    const { name, value } = event.target;
    const $submitButton = $(".submit-button", this.$loginPage);

    this.setState({ ...this.state, [name]: value });
    this.validateForm();

    if ($submitButton) {
      $submitButton.disabled = this.state.disabled;
    }
  };

  this.bindEvents = () => {
    const $submitButton = $(".submit-button", this.$loginPage);
    const $form = $("form", this.$loginPage);

    $submitButton.addEventListener("click", this.handleSubmit);
    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", event => {
      event.preventDefault();
      this.handleSubmit();
    });
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default Login;
