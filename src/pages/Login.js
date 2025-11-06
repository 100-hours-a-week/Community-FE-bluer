import { $, isValidEmail, isValidPassword } from "../utils/index.js";

function Login({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = {
    ...initialState,
    isWaiting: false,
    email: "",
    password: "",
    isErrorEmail: false,
    isErrorPassword: false,
    errorEmailMessage: "",
    errorPasswordMessage: "",
  };
  this.$loginPage = document.createElement("div");
  this.$loginPage.classList.add("login-page");

  this.renderErrorMessages = () => {
    const $emailErrorMessage = $(".error-message.email", this.$loginPage);
    const $passwordErrorMessage = $(".error-message.password", this.$loginPage);

    if (this.state.isErrorEmail) {
      $emailErrorMessage.textContent = this.state.errorEmailMessage;
    } else {
      $emailErrorMessage.textContent = "";
    }

    if (this.state.isErrorPassword) {
      $passwordErrorMessage.textContent = this.state.errorPasswordMessage;
    } else {
      $passwordErrorMessage.textContent = "";
    }
  };

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
              <input class="input-email" type="email" name="email" placeholder="이메일을 입력하세요">
              <span class="error-message email"></span>
            </div>
            <div class="input-container">
              <label for="password">비밀번호</label>
              <input class="input-password" type="password" name="password" placeholder="비밀번호를 입력하세요" autocomplete/>
              <span class='error-message password'><span>
            </div>
            <button type="submit" class="submit-button">로그인</button>
          </form>
          <div class="signup-container">
            <a href="/signup">회원가입</a>
          </div>
        </div>
    `;

    this.target.appendChild(this.$loginPage);
  };

  this.handleSubmit = () => {
    this.setState({ isErrorEmail: false, isErrorPassword: false });

    if (!isValidEmail(this.state.email)) {
      this.setState({
        isErrorEmail: true,
        errorEmailMessage: `올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com) `,
      });
      this.renderErrorMessages();
    }
    if (this.state.password.length < 1) {
      this.setState({
        isErrorPassword: true,
        errorPasswordMessage: `비밀번호를 입력해주세요`,
      });
      this.renderErrorMessages();
    } else if (!isValidPassword(this.state.password)) {
      this.setState({
        isErrorPassword: true,
        errorPasswordMessage: `비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.`,
      });
      this.renderErrorMessages();
      return;
    }

    try {
      // TODO: 로그인 API 요청
      if (
        this.state.email === "test@test.com" &&
        this.state.password === "Testtest1!"
      ) {
        $(".submit-button").classList.add("isLoading");
        setTimeout(() => {
          moveTo("signup");
        }, 3000);
      }
    } catch (error) {
      // TODO: 아이디 또는 비밀번호를 확인해 주세요
      console.error("로그인 중 오류 발생:", error);
    }
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  this.bindEvents = () => {
    const $submitButton = $(".submit-button", this.$loginPage);
    const $form = $("form", this.$loginPage);
    const $signupLink = $(".signup-container a", this.$loginPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", event => {
      event.preventDefault();
      this.handleSubmit();
    });
    $signupLink.addEventListener("click", event => {
      event.preventDefault();
      moveTo("signup");
    });
  };

  this.init = () => {
    // TODO: if (login) moveTo("post-list");
    if (this.currentPage !== "login") {
      return;
    }
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default Login;
