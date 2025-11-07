function UserInfo({ $target, initialState, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = { ...initialState };

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
                    src="./public/profile-sample.jpeg"
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
                value="startupcode@gmail.com"
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
                value="스타트업코드"
              />
              <!-- TODO: value: with api -->
              <span class="error-message email"></span>
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
  this.init = () => {
    console.log("run");
    this.render();
  };
}

export default UserInfo;
