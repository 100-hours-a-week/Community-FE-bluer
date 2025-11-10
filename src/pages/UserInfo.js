import { getErrorMessage } from "../lib/validation.js";
import { $ } from "../lib/dom.js";
import { showToast } from "../lib/utils.js";
import { getNicknameError } from "../lib/validation.js";

function UserInfo({ $target }) {
  this.target = $target;
  this.state = {
    email: "",
    nickname: "",
    profileImgUrl: null,
  };
  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.$userInfoPage = document.createElement("div");
  this.$userInfoPage.classList.add("user-info-page", "page-layout");

  this.render = () => {
    this.$userInfoPage.innerHTML = `
    <h2 class="page-title big bold">회원정보수정</h2>
      <div class="signup-form-container">
        <form>
          <div>
            <div>
              <strong class="bold">프로필 사진*</strong>
            </div>
            <span class="error-message profile"></span>
            <div class="add-photo-container user-info">
              <input class="add-photo-file-input none" type="file" />
              <button class="add-profile-photo-button">
                <div class="profile-image-container">
                  <img
                    class="profile-image"
                    src=${this.state.profileImgUrl}
                  />
                  <div class="profile-overlay">
                    <div class="profile-overlay-text"><span> 변경 </span></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <ul class="form-input-list">
            <li class="input-container">
              <label for="email">이메일</label>
              <input
                class="input-email input-readonly"
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                readonly
                value=${this.state.email}             
              />
              <!-- TODO: value: with api -->
              <span class="error-message email"></span>
            </li>
            <li class="input-container">
              <label for="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value=${this.state.nickname}
              />
              <!-- TODO: value: with api -->
              <span class="error-message nickname"></span>
            </li>
          </ul>
          <button class="submit-button signup-button" type="submit">
            수정하기
          </button>
        </form>
        <div class="link-container withdrawal">
          <a href="/withdrawal">회원 탈퇴</a>
        </div>
      </div>
    `;

    this.target.appendChild(this.$userInfoPage);
  };

  this.initErrorMessage = () => {
    const errorElement = $(`.error-message.profile`, this.$signupPage);

    const emailErrorElement = $(`.error-message.email`, this.$userInfoPage);
    const nicknameErrorElement = $(
      `.error-message.nickname`,
      this.$userInfoPage
    );

    errorElement.innerText = "";
    nicknameErrorElement.innerText = "";
    emailErrorElement.innerText = "";
  };

  this.renderErrorMessage = (message = "히히") => {
    const nicknameErrorElement = $(
      `.error-message.nickname`,
      this.$userInfoPage
    );

    nicknameErrorElement.innerText = message;
  };

  // TODO: api 연동
  this.isDuplicatedNickname = nickname => nickname === "중복";

  this.handleSubmit = event => {
    event.preventDefault();
    this.initErrorMessage();

    const { nickname } = this.state;
    const nicknameError = getNicknameError(nickname);

    if (nicknameError.errorType) {
      this.renderErrorMessage(getErrorMessage(nicknameError.errorType));
      return;
    }

    // TODO: API 요청
    showToast("수정 완료");
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  this.bindEvents = () => {
    const $form = $("form", this.$userInfoPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", this.handleSubmit);
  };

  this.init = () => {
    // TODO: set initialValue with api, 최초 닉네임은 중복 검사 대상에서 제외하기 위해 따로 저장
    this.setState({
      email: "startupcode@gmail.com",
      nickname: "스타트업코드",
      profileImgUrl: "/public/profile-sample.jpeg",
      initialNickname: "스타트업코드",
    });

    this.render();
    this.bindEvents();
  };
}

export default UserInfo;
