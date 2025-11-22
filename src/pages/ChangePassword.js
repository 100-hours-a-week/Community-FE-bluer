import { $ } from "../lib/dom.js";
import { getPasswordError, getPasswordCheckError } from "../lib/validation.js";
import { ERROR_MESSAGES } from "../lib/constants.js";
import { showToast } from "../lib/utils.js";
import { apiManager } from "../lib/api/apiManager.js";

function ChangePassword({ $target, initialState = {} }) {
  this.target = $target;
  this.state = {
    ...initialState,
    password: "",
    passwordcheck: "",
    isValid: {
      password: false,
      passwordcheck: false,
    },
  };

  this.$element = document.createElement("div");
  this.$element.className = "user-info-page page-layout";

  this.$errorElement = name => $(`.error-message.${name}`, this.$element);

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.updateSubmitButtonState = () => {
    const { isValid } = this.state;
    const allValid = Object.values(isValid).every(v => v);

    const $submitButton = $(".submit-button", this.$element);

    if ($submitButton) {
      $submitButton.disabled = !allValid;
      $submitButton.classList.toggle("active", allValid);
    }
  };

  this.getFormFieldErrorType = formName => {
    const validatorMap = {
      password: () => getPasswordError(this.state.password),
      passwordcheck: () =>
        getPasswordCheckError(this.state.password, this.state.passwordcheck),
    };

    const validator = validatorMap[formName];
    if (!validator) {
      return null;
    }

    const { errorType } = validator();
    return errorType;
  };

  this.validateField = name => {
    const errorType = this.getFormFieldErrorType(name);
    return { errorType, isValid: !errorType };
  };

  this.updateFieldErrorView = (name, errorType) => {
    const $error = this.$errorElement(name);

    if (!$error) {
      return;
    }

    $error.innerText = errorType ? ERROR_MESSAGES[errorType] : "";
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  this.handleBlur = event => {
    const { target } = event;
    if (target.tagName !== "INPUT") {
      return;
    }

    const { name } = target;
    const { errorType, isValid } = this.validateField(name);

    this.setState({ isValid: { ...this.state.isValid, [name]: isValid } });
    this.updateFieldErrorView(name, errorType);

    this.updateSubmitButtonState();
  };

  this.handleSubmit = async event => {
    event.preventDefault();

    try {
      await apiManager.updatePassword({
        password: this.state.password,
      });
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    showToast("수정 완료");
  };

  this.bindEvents = () => {
    const $form = $("form", this.$element);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("blur", this.handleBlur, true);
    $form.addEventListener("submit", this.handleSubmit);
  };

  this.render = () => {
    this.$element.innerHTML = `
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
              <span class="error-message password"></span>
            </li>

            <li class="input-container">
              <label for="password-check">비밀번호 확인</label>
              <input
                type="password"
                name="passwordcheck"
                placeholder="비밀번호를 한번 더 입력하세요"
              />
              <span class="error-message passwordcheck"></span>
            </li>
          </ul>
          <button class="submit-button signup-button" type="submit" disabled>
            수정하기
          </button>
        </form>
      </div>
    `;

    this.target.appendChild(this.$element);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default ChangePassword;
