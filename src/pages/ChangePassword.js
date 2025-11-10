import { $ } from "../lib/dom.js";
import { getPasswordError, getPasswordCheckError } from "../lib/validation.js";
import { ERROR_MESSAGES, ERROR_TYPE } from "../lib/constants.js";
import { showToast } from "../lib/utils.js";

function ChangePassword({ $target, initialState = {}, moveTo }) {
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
  this.$element.className = "user-info-page";

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
      $submitButton.style.backgroundColor = allValid ? "#7F6AEE" : "#ACA0EB";
    }
  };

  this.getFormFieldErrorType = formName => {
    const validatorMap = {
      password: () => getPasswordError(this.state.password),
      passwordcheck: () =>
        getPasswordCheckError(this.state.password, this.state.passwordcheck),
    };

    const validator = validatorMap[formName];
    if (!validator) return null;

    const { errorType } = validator();
    return errorType;
  };

  this.renderTextFieldError = (name, errorType) => {
    if (errorType) {
      this.$errorElement(name).innerText = ERROR_MESSAGES[errorType] || "";
    } else {
      this.$errorElement(name).innerText = "";
    }
  };

  this.handleInput = e => {
    const { name, value } = e.target;
    if (this.state[name] !== undefined) {
      this.setState({ [name]: value });
    }
  };

  this.handleBlur = e => {
    const { target } = e;
    if (target.tagName !== "INPUT") return;

    const { name } = target;
    const errorType = this.getFormFieldErrorType(name);

    if (errorType) {
      this.renderTextFieldError(name, errorType);
      this.state.isValid[name] = false;
    } else {
      this.renderTextFieldError(name, null);
      this.state.isValid[name] = true;
    }

    this.updateSubmitButtonState();
  };

  this.handleSubmit = e => {
    e.preventDefault();

    // TODO: 실제 비밀번호 변경 API 요청

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
}

export default ChangePassword;
