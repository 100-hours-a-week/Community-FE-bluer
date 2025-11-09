import { $ } from "../lib/dom.js";

import {
  getEmailError,
  getPasswordError,
  getPasswordCheckError,
  getNicknameError,
  getSignupInputError,
} from "../lib/validation.js";
import { ERROR_MESSAGES } from "../lib/constants.js";

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

  this.$signupPage = document.createElement("div");
  this.$signupPage.classList.add("signup-page", "page-layout");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.validateField = name => {
    let errorType = null;

    if (name === "email") {
      const { errorType: type } = getEmailError(this.state.email);
      errorType = type;
    } else if (name === "password") {
      const { errorType: type } = getPasswordError(this.state.password);
      errorType = type;
    } else if (name === "passwordcheck") {
      const { errorType: type } = getPasswordCheckError(
        this.state.password,
        this.state.passwordcheck
      );
      errorType = type;
    } else if (name === "nickname") {
      const { errorType: type } = getNicknameError(this.state.nickname);
      errorType = type;
    }

    const errorElement = $(`.error-message.${name}`, this.$signupPage);

    if (errorType) {
      errorElement.innerText = ERROR_MESSAGES[errorType] || "";
      this.state.isValid[name] = false;
    } else {
      errorElement.innerText = "";
      this.state.isValid[name] = true;
    }

    this.updateSubmitButtonState();
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

  this.getPhotoButtonHTML = () => {
    if (this.state.profileImgUrl?.length > 0) {
      return `
        <button type="button" class="add-profile-photo-button">
          <img src="${this.state.profileImgUrl}" alt="프로필 미리보기" class="profile-preview" />
        </button>
      `;
    } else {
      return '<button type="button" class="add-profile-photo-button plus"></button>';
    }
  };

  this.render = () => {
    this.$signupPage.innerHTML = `
      <div>
        <h2 class="page-title bold">회원가입</h2>
        <div class="signup-form-container">
          <form>
            <div>
              <div><strong class="bold"> 프로필 사진 </strong></div>
              <span class="error-message profile"></span>
              <div class="add-photo-container">
                <div class="add-profile-photo-container">${this.getPhotoButtonHTML()}</div>
              </div>
            </div>

            <ul class="form-input-list">
              <li class="input-container">
                <label for="email">이메일</label>
                <input class="input-email" type="email" name="email" placeholder="이메일을 입력하세요" />
                <span class="error-message email"></span>
              </li>
              <li class="input-container">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" />
                <span class="error-message password"></span>
              </li>
              <li class="input-container">
                <label for="passwordcheck">비밀번호 확인</label>
                <input type="password" id="passwordcheck" name="passwordcheck" />
                <span class="error-message passwordcheck"></span>
              </li>
              <li class="input-container">
                <label for="nickname">닉네임</label>
                <input type="text" id="nickname" name="nickname" />
                <span class="error-message nickname"></span>
              </li>
            </ul>

            <button class="submit-button signup-button" type="submit" disabled>회원가입</button>
          </form>
          <div class="link-container login"><a href="/login">로그인하러 가기</a></div>
        </div>
        <input type="file" accept="image/*" class="add-photo-file-input" />
      </div>
    `;
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

    this.validateField(name);
  };

  this.handleSubmit = event => {
    event.preventDefault();

    const { errorType } = getSignupInputError(this.state);

    if (errorType) {
      const message = ERROR_MESSAGES[errorType];

      alert(message || "입력값을 다시 확인해주세요.");
      return;
    }
    // TODO: add routing
    alert("TODO: 가입 성공 및 로그인 페이지로 이동");
  };

  this.handleChangeFileInput = event => {
    const file = event.target.files[0];
    const $photoContainer = $(".add-profile-photo-container", this.$signupPage);

    if (!file) {
      this.setState({ profileImgUrl: null });
      $photoContainer.innerHTML =
        '<button type="button" class="add-profile-photo-button plus"></button>';
      return;
    }

    const blobUrl = URL.createObjectURL(file);

    this.setState({ profileImgUrl: blobUrl });

    $photoContainer.innerHTML = `
      <button type="button" class="add-profile-photo-button">
        <img src="${blobUrl}" class="profile-preview" alt="미리보기" />
      </button>
    `;
    $(".error-message.profile", this.$signupPage).innerText = "";
    this.state.isValid.profileImgUrl = true;
    this.updateSubmitButtonState();
  };

  this.handleClickPhotoContainer = () => {
    $(".add-photo-file-input", this.$signupPage).click();
  };

  this.bindEvents = () => {
    const $form = $("form", this.$signupPage);
    const $fileInput = $(".add-photo-file-input", this.$signupPage);
    const $addPhotoContainer = $(".add-photo-container", this.$signupPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("blur", this.handleBlur, true);
    $form.addEventListener("submit", this.handleSubmit);
    $addPhotoContainer.addEventListener(
      "click",
      this.handleClickPhotoContainer
    );
    $fileInput.addEventListener("change", this.handleChangeFileInput);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
}

export default Signup;
