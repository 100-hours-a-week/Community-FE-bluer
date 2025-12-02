import { $ } from "../lib/dom.js";

import {
  getEmailError,
  getPasswordError,
  getPasswordCheckError,
  getNicknameError,
  requestFieldAvailability,
} from "../lib/validation.js";
import { ERROR_TYPE, ERROR_MESSAGES } from "../lib/constants.js";

import { signupTemplate } from "../template/SignupTemplate.js";
import { apiManager } from "../lib/api/apiManager.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { showToast } from "../lib/utils.js";
import { uploadToImageBucket } from "../lib/external/imageBucket.js";

function Signup({ $target, initialState, moveTo }) {
  this.target = $target;
  this.moveTo = moveTo;

  this.state = {
    ...initialState,
    email: "",
    password: "",
    passwordcheck: "",
    nickname: "",
    profileImgUrl: null,
    file: null,
    isValid: {
      email: false,
      password: false,
      passwordcheck: false,
      nickname: false,
    },
  };

  this.$signupPage = document.createElement("div");
  this.$signupPage.classList.add("signup-page", "page-layout");
  this.$errorElement = name => $(`.error-message.${name}`, this.$signupPage);

  this.$form = null;
  this.$fileInput = null;
  this.$addPhotoContainer = null;
  this.$signInLink = null;

  this.target.appendChild(this.$signupPage);

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.updateSubmitButtonState = () => {
    const { isValid } = this.state;
    const allValid =
      Object.values(isValid).every(v => v) &&
      this.state.profileImgUrl?.length > 0;

    const $submitButton = $(".signup-button", this.$signupPage);

    if ($submitButton) {
      $submitButton.disabled = !allValid;
      $submitButton.classList.toggle("active", allValid);
    }
  };

  this.checkDuplicated = async field => {
    const fieldValue = this.state[field];

    if (!fieldValue) {
      return;
    }

    const errorType = await requestFieldAvailability(field, fieldValue);

    if (errorType) {
      this.renderTextFieldError(field, errorType);
      this.state.isValid[field] = false;
    } else {
      this.initTextFieldError(field);
      this.state.isValid[field] = true;
    }

    this.updateSubmitButtonState();
  };

  // TODO: 외부 파일로
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

  /* Render */
  this.initTextFieldError = name => {
    this.$errorElement(name).innerText = "";
  };

  this.renderTextFieldError = (name, errorType) => {
    if (errorType) {
      this.$errorElement(name).innerText = ERROR_MESSAGES[errorType] || "";
    } else {
      this.$errorElement(name).innerText = "";
    }
  };

  this.initFileInput = () => {
    const $photoContainer = $(".add-profile-photo-container", this.$signupPage);

    $photoContainer.innerHTML =
      '<button type="button" class="add-profile-photo-button plus"></button>';
  };

  this.renderProfileImage = () => {
    const $photoContainer = $(".add-profile-photo-container", this.$signupPage);

    $photoContainer.innerHTML = signupTemplate.photoButton(this.state);
    $(".error-message.profile", this.$signupPage).innerText = "";
  };

  this.renderImageFieldError = () => {
    const errorElement = $(`.error-message.profile`, this.$signupPage);

    errorElement.innerText =
      ERROR_MESSAGES[ERROR_TYPE.EMPTY_PROFILE_IMAGE] || "";
  };

  /* handlers */
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

    const errorType = this.getFormFieldErrorType(name);

    if (errorType) {
      this.renderTextFieldError(name, errorType);
      this.state.isValid[name] = false;
    } else {
      this.initTextFieldError(name);
      this.state.isValid[name] = true;
    }
    this.updateSubmitButtonState();

    if (!this.state.profileImgUrl) {
      this.renderImageFieldError();
    }

    if ((name === "nickname" || name === "email") && !errorType) {
      this.checkDuplicated(name);
    }
  };

  this.signup = async () => {
    const url = await uploadToImageBucket(this.state.file);

    try {
      const response = await apiManager.signUp({
        email: this.state.email,
        password: this.state.password,
        nickname: this.state.nickname,
        profileImageUrl: url,
      });
      if (response.status === StatusCode.CREATED) {
        showToast("가입 완료");
        setTimeout(() => {
          this.moveTo("/login");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleSubmit = event => {
    event.preventDefault();

    this.signup();
  };

  this.handleChangeFileInput = event => {
    const file = event.target.files[0];

    if (this.state.profileImgUrl) {
      URL.revokeObjectURL(this.state.profileImgUrl);
    }

    if (!file) {
      this.setState({ profileImgUrl: null });
      this.initFileInput();
    } else {
      const blobUrl = URL.createObjectURL(file);

      this.setState({ profileImgUrl: blobUrl, file });
      this.renderProfileImage(file);
    }
    this.updateSubmitButtonState();
  };

  this.onHiddenFileInputClick = () => {
    $(".add-photo-file-input", this.$signupPage).click();
  };

  this.onClickSignInLink = event => {
    event.preventDefault();

    this.moveTo("/login");
  };

  this.bindEvents = () => {
    this.$form.addEventListener("input", this.handleInput);
    this.$form.addEventListener("blur", this.handleBlur, true);
    this.$form.addEventListener("submit", this.handleSubmit);
    this.$fileInput.addEventListener("change", this.handleChangeFileInput);
    this.$addPhotoContainer.addEventListener(
      "click",
      this.onHiddenFileInputClick
    );
    this.$signInLink.addEventListener("click", this.onClickSignInLink);
  };

  this.cleanUp = () => {
    this.$form.removeEventListener("input", this.handleInput);
    this.$form.removeEventListener("blur", this.handleBlur, true);
    this.$form.removeEventListener("submit", this.handleSubmit);
    this.$fileInput.removeEventListener("change", this.handleChangeFileInput);
    this.$addPhotoContainer.removeEventListener(
      "click",
      this.onHiddenFileInputClick
    );
    this.$signInLink.removeEventListener("click", this.onClickSignInLink);
    if (this.state.profileImgUrl) {
      URL.revokeObjectURL(this.state.profileImgUrl);
      this.state.profileImgUrl = null;
    }
    this.state.file = null;
  };

  this.render = () => {
    this.$signupPage.innerHTML = signupTemplate.page({
      photoButtonHtmlString: signupTemplate.photoButton(this.state),
    });

    this.$form = $("form", this.$signupPage);
    this.$fileInput = $(".add-photo-file-input", this.$signupPage);
    this.$addPhotoContainer = $(".add-photo-container", this.$signupPage);
    this.$signInLink = $(".link-container.login a", this.$signupPage);

    this.target.appendChild(this.$signupPage);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default Signup;
