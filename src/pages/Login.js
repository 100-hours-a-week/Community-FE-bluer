import { $ } from "../utils/index.js";

function Login({ $target, initialState }) {
  this.target = $target;
  this.state = { ...initialState, disabled: true, email: "", password: "" };
  this.$loginPage = document.createElement("div");
  this.$loginPage.classList.add("login-page");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
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
    console.log("run fomrm");
    const { email, password } = this.state;
    // todo: 이메일 정규식 검사
    const isValidEmail = true;
    // todo: password 정규식 검사
    const isValidPassword = password.length >= 8;

    if (isValidEmail && isValidPassword) {
      this.setState({ ...this.state, disabled: false });
      console.log("run");
    }
  };

  this.handleInputEmail = event => {
    console.log("input email");
    const { value } = event.target;
    this.setState({ ...this.state, email: value });
    this.validateForm();
  };

  this.handleInputPassword = event => {
    console.log("input password");
    const { value } = event.target;
    this.setState({ ...this.state, password: value });
    this.validateForm();
  };

  this.bindEvents = () => {
    const $inputEmail = $(".input-email", this.$loginPage);
    const $inputPassword = $(".input-password", this.$loginPage);
    const $submitButton = $(".submit-button", this.$loginPage);
    const $form = $("form", this.$loginPage);

    $inputEmail.addEventListener("input", this.handleInputEmail);
    $inputPassword.addEventListener("input", this.handleInputPassword);
    $submitButton.addEventListener("click", this.handleSubmit);
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
