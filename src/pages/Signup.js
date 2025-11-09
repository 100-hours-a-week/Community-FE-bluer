import { $ } from "../lib/dom.js";
import { handleInput } from "../lib/handlers.js";

function Signup({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = {
    ...initialState,
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    profileImgUrl: null,
    isErrorProfileImage: false,
    isErrorEmail: false,
    isErrorPassword: false,
    isErrorPasswordCheck: false,
    isErrorNickname: false,
    errorProfileImageMessage: "",
    errorEmailMessage: "",
    errorPasswordMessage: "",
    errorPasswordCheckMessage: "",
  };

  this.$signupPage = document.createElement("div");
  this.$signupPage.classList.add("signup-page", "page-layout");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
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
              <div>
                <strong class="bold"> 프로필 사진 </strong>
              </div>
              <span class="error-message profile"></span>
              <div class="add-photo-container">
                <div class="add-profile-photo-container">
                  ${this.getPhotoButtonHTML()}
                </div>
              </div>
            </div>
            <ul class="form-input-list">
              <li class="input-container">
                <label for="email">이메일</label>
                <input
                  class="input-email"
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                />
                <span class="error-message email"></span>
              </li>
              <li class="input-container">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" />
                <span class="error-message password"></span>
              </li>
              <li class="input-container">
                <label for="password-check">비밀번호 확인</label>
                <input
                  type="password"
                  id="password-check"
                  name="password-check"
                />
                <span class="error-message password-check"></span>
              </li>
              <li class="input-container">
                <label for="nickname">닉네임</label>
                <input type="text" id="nickname" name="nickname" />
                <span class="error-message nickname"></span>
              </li>
            </ul>
            <button class="submit-button signup-button" type="submit">
              회원가입
            </button>
          </form>
          <div class="link-container login">
            <a href="/login">로그인하러 가기</a>
          </div>
        </div>
        <input type="file" accept="image/*" class="add-photo-file-input" />
      </div>
    `;
    this.target.appendChild(this.$signupPage);
  };

  this.handleInput = event => {
    handleInput(event, this.state, this.setState);
  };

  this.handleSubmit = () => {
    console.log("회원가입 요청 body 예시:", this.state);
  };

  this.handleChangeFileInput = event => {
    const file = event.target.files[0];
    const $photoButtonContainer = $(
      ".add-profile-photo-container",
      this.$signupPage
    );

    if (!file) {
      this.setState({ profileImgUrl: null });
      $photoButtonContainer.innerHTML =
        '<button type="button" class="add-profile-photo-button plus"></button>';
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    this.setState({ profileImgUrl: blobUrl });

    $photoButtonContainer.innerHTML = `
      <button type="button" class="add-profile-photo-button">
        <img src="${blobUrl}" alt="프로필 미리보기" class="profile-preview" />
      </button>
    `;
  };

  this.handleClickPhotoContainer = () => {
    const $fileInput = $(".add-photo-file-input", this.$signupPage);
    $fileInput.click();
  };

  this.bindEvents = () => {
    const $form = $("form", this.$signupPage);
    const $addPhotoContainer = $(".add-photo-container", this.$signupPage);
    const $fileInput = $(".add-photo-file-input", this.$signupPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", event => {
      event.preventDefault();
      this.handleSubmit();
    });

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
