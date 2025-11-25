import { $ } from "../lib/dom.js";
import { getState, dispatch } from "../lib/store.js";
import {
  ERROR_MESSAGES,
  ERROR_TYPE,
  LOGIN_DELAY_MILLISECONDS,
} from "../lib/constants.js";
import { getLoginInputError } from "../lib/validation.js";

import { apiManager } from "../lib/api/apiManager.js";

function Login({ $target, initialState, moveTo }) {
  this.target = $target;
  this.moveTo = moveTo;

  this.state = {
    ...initialState,
    email: "",
    password: "",
    isErrorEmail: false,
    isErrorPassword: false,
    errorEmailMessage: "",
    errorPasswordMessage: "",
  };
  this.$loginPage = document.createElement("div");
  this.$loginPage.classList.add("login-page", "page-layout");

  this.renderErrorMessages = errorType => {
    const $emailErrorMessage = $(".error-message.email", this.$loginPage);
    const $passwordErrorMessage = $(".error-message.password", this.$loginPage);

    $emailErrorMessage.textContent = "";
    $passwordErrorMessage.textContent = "";

    switch (errorType) {
      case ERROR_TYPE.WRONG_FORMAT_EMAIL:
        $emailErrorMessage.textContent = ERROR_MESSAGES[errorType];
        break;
      case ERROR_TYPE.TOO_SHORT_PASSWORD:
      case ERROR_TYPE.WRONG_FORMAT_PASSWORD:
        $passwordErrorMessage.textContent = ERROR_MESSAGES[errorType];
        break;
      case ERROR_TYPE.LOGIN_FAILED:
        $passwordErrorMessage.textContent = ERROR_MESSAGES[errorType];
        break;
      default:
        break;
    }
  };

  this.login = async ({ email, password }) => {
    try {
      const result = await apiManager.login({ email, password });

      $(".submit-button", this.$loginPage).classList.add("isLoading");
      setTimeout(() => {
        dispatch("LOGIN", {
          userId: result.data.userId,
        });
      }, LOGIN_DELAY_MILLISECONDS);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      this.renderErrorMessages(ERROR_TYPE.LOGIN_FAILED);
    } finally {
      $(".submit-button", this.$loginPage).classList.remove("isLoading");
    }
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.render = () => {
    this.$loginPage.innerHTML = `
      <div class="login-container">
        <div>
          <span class="bold">로그인<span>
        </div>
        <div>
          <form class="form-input-list">
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
          <div class="link-container signup">
            <a href="/signup">회원가입</a>
          </div>
        </div>
    `;

    this.target.appendChild(this.$loginPage);
  };

  this.handleSubmit = () => {
    this.setState({ isErrorEmail: false, isErrorPassword: false });

    const { errorType } = getLoginInputError(
      this.state.email,
      this.state.password
    );

    if (errorType) {
      this.renderErrorMessages(errorType);
      return;
    }

    this.login({
      email: this.state.email,
      password: this.state.password,
    });
  };

  // TODO: modulation
  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  this.bindEvents = () => {
    const $form = $("form", this.$loginPage);
    const $signupLink = $(".link-container.signup a", this.$loginPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", event => {
      event.preventDefault();
      this.handleSubmit();
    });
    $signupLink.addEventListener("click", event => {
      event.preventDefault();
      this.moveTo("signup");
    });
  };

  this.init = () => {
    const { isLoggedIn } = getState();

    if (isLoggedIn) {
      this.moveTo("posts");
      return;
    }
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default Login;
