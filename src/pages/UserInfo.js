import { getErrorMessage } from "../lib/validation.js";
import { $ } from "../lib/dom.js";
import { showModal, showToast } from "../lib/utils.js";
import { getNicknameError } from "../lib/validation.js";
import { apiManager } from "../lib/api/apiManager.js";
import { ERROR_TYPE } from "../lib/constants.js";
import { dispatch } from "../lib/store.js";

function UserInfo({ $target }) {
  this.target = $target;
  this.state = {
    email: "",
    nickname: "",
    profileImgUrl: null,
    initialNickname: "",
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
            </li>
            <li class="input-container">
              <label for="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value=${this.state.nickname}
              />
              <span class="error-message nickname"></span>
            </li>
          </ul>
          <button class="submit-button signup-button" disabled type="submit">
            수정하기
          </button>
        </form>
        <div class="withdrawal-button-container">
          <button type="button" class="withdrawal-button">
            회원 탈퇴
          </button>
        </div>
      </div>
    `;

    this.target.appendChild(this.$userInfoPage);
  };

  this.initErrorMessage = () => {
    const errorElement = $(`.error-message.profile`, this.$signupPage);

    const nicknameErrorElement = $(
      `.error-message.nickname`,
      this.$userInfoPage
    );

    errorElement.innerText = "";
    nicknameErrorElement.innerText = "";
  };

  this.renderErrorMessage = (message = "히히") => {
    const nicknameErrorElement = $(
      `.error-message.nickname`,
      this.$userInfoPage
    );

    nicknameErrorElement.innerText = message;
  };

  this.handleSubmit = async event => {
    event.preventDefault();
    this.initErrorMessage();

    const { nickname } = this.state;
    const nicknameError = getNicknameError(nickname);

    if (nicknameError.errorType) {
      this.renderErrorMessage(getErrorMessage(nicknameError.errorType));
      return;
    }

    try {
      const { data } = await apiManager.checkAvailability({ nickname });

      if (!data.available) {
        this.renderErrorMessage(getErrorMessage(ERROR_TYPE.DUPLICATE_NICKNAME));

        return;
      }

      const { data: updateData } = await apiManager.updateProfile({
        nickname,
      });
      showToast("수정 완료");
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleInput = event => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });

    $(".submit-button").disabled =
      this.state.nickname === this.state.initialNickname;
  };

  this.handleWithdrawal = async () => {
    try {
      await apiManager.withdrawProfile();

      showToast("회원 탈퇴 완료");
      dispatch("LOGOUT");
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleWithdrawalClick = () => {
    showModal({
      modalTitle: "회원탈퇴 하시겠습니까?",
      modalDescription: "작성된 게시글과 댓글은 삭제됩니다.",
      positiveText: "확인",
      negativeText: "취소",
      onPositive: () => {
        this.handleWithdrawal();
      },
    });
  };

  this.bindEvents = () => {
    const $form = $("form", this.$userInfoPage);
    const $withdrawalButton = $(".withdrawal-button", this.$userInfoPage);

    $form.addEventListener("input", this.handleInput);
    $form.addEventListener("submit", this.handleSubmit);
    $withdrawalButton.addEventListener("click", this.handleWithdrawalClick);
  };

  this.getUserProfile = async () => {
    try {
      const { data } = await apiManager.getUserProfile();

      this.setState({
        email: data.email,
        nickname: data.nickname,
        profileImgUrl: data.profileImageUrl,
        initialNickname: data.nickname,
      });
    } catch (error) {
      showToast(`Error: 유저 정보 조회 중 에러 발생`);
      console.error(error);
    }
  };

  this.init = async () => {
    await this.getUserProfile();

    this.render();
    this.bindEvents();
  };
}

export default UserInfo;
