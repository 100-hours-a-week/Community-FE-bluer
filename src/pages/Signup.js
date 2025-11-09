import { $ } from "../lib/dom.js";

import {
  getEmailError,
  getPasswordError,
  getPasswordCheckError,
  getNicknameError,
} from "../lib/validation.js";
import { ERROR_TYPE, ERROR_MESSAGES } from "../lib/constants.js";

import { signupTemplate } from "../template/SignupTemplate.js";

function Signup({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = {
    ...initialState,
    email: "",
    password: "",
    passwordcheck: "",
    nickname: "",
    profileImgUrl: null,
    isValid: {
      email: false,
      password: false,
      passwordcheck: false,
      nickname: false,
      profileImgUrl: false,
    },
  };
  this.moveTo = moveTo;

  this.$signupPage = document.createElement("div");
  this.$signupPage.classList.add("signup-page", "page-layout");
  this.$errorElement = name => $(`.error-message.${name}`, this.$signupPage);

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.validateImageField = () => {
    if (!this.state.profileImgUrl) {
      const errorElement = $(`.error-message.profile`, this.$signupPage);
      errorElement.innerText =
        ERROR_MESSAGES[ERROR_TYPE.EMPTY_PROFILE_IMAGE] || "";
      this.state.isValid[name] = false;
    }
  };

  this.updateSubmitButtonState = () => {
    const { isValid } = this.state;
    const allValid = Object.values(isValid).every(v => v);
    const $signupButton = $(".signup-button", this.$signupPage);

    if ($signupButton) {
      $signupButton.disabled = !allValid;
      $signupButton.style.backgroundColor = allValid ? "#7F6AEE" : "#ACA0EB";
    }
  };

  this.getFormFieldErrorType = formName => {
    const validatorMap = {
      email: () => getEmailError(this.state.email),
      password: () => getPasswordError(this.state.password),
      passwordcheck: () =>
        getPasswordCheckError(this.state.password, this.state.passwordcheck),
      nickname: () => getNicknameError(this.state.nickname),
    };

    const validator = validatorMap[formName];
    if (!validator) {
      return null;
    }

    const { errorType } = validator();

    return errorType;
  };

  this.validateTextField = name => {
    const errorType = this.getFormFieldErrorType(name);

    if (errorType) {
      this.$errorElement(name).innerText = ERROR_MESSAGES[errorType] || "";
      this.state.isValid[name] = false;
    } else {
      this.$errorElement(name).innerText = "";
      this.state.isValid[name] = true;
    }

    this.updateSubmitButtonState();
  };

  this.initFileInput = () => {
    const $photoContainer = $(".add-profile-photo-container", this.$signupPage);

    $photoContainer.innerHTML =
      '<button type="button" class="add-profile-photo-button plus"></button>';
  };

  this.renderProfileImage = file => {
    const $photoContainer = $(".add-profile-photo-container", this.$signupPage);
    const blobUrl = URL.createObjectURL(file);

    this.setState({ profileImgUrl: blobUrl });

    $photoContainer.innerHTML = signupTemplate.photoButton(this.state);
    $(".error-message.profile", this.$signupPage).innerText = "";
  };

  this.render = () => {
    this.$signupPage.innerHTML = signupTemplate.page({
      photoButtonHtmlString: signupTemplate.photoButton(this.state),
    });

    this.target.appendChild(this.$signupPage);
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    if (this.state[name] !== undefined) {
      this.setState({ [name]: value });
    }
  };

  this.handleBlur = event => {
    const { target } = event;
    const { name } = target;

    if (target.tagName !== "INPUT") {
      return;
    }

    this.validateTextField(name);
    this.validateImageField();
  };

  this.handleSubmit = event => {
    event.preventDefault();

    // TODO: api handling for signing event
    this.moveTo("login");
    // alert("TODO: 가입 성공 및 로그인 페이지로 이동");
  };

  this.handleChangeFileInput = event => {
    const file = event.target.files[0];

    if (!file) {
      this.setState({ profileImgUrl: null });
      this.initFileInput();
      return;
    } else {
      this.renderProfileImage(file);
      this.updateSubmitButtonState();
    }
  };

  this.onHiddenFileInputClick = () => {
    $(".add-photo-file-input", this.$signupPage).click();
  };

  this.bindEvents = () => {
    const $form = $("form", this.$signupPage);
    const $fileInput = $(".add-photo-file-input", this.$signupPage);
    const $addPhotoContainer = $(".add-photo-container", this.$signupPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("blur", this.handleBlur, true);
    $form.addEventListener("submit", this.handleSubmit);
    $fileInput.addEventListener("change", this.handleChangeFileInput);
    $addPhotoContainer.addEventListener("click", this.onHiddenFileInputClick);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
}

export default Signup;
