export const signupTemplate = {
  photoButton: state => {
    if (state.profileImgUrl?.length > 0) {
      return `
        <button type="button" class="add-profile-photo-button">
          <img src="${state.profileImgUrl}" alt="프로필 미리보기" class="profile-preview" />
        </button>
      `;
    } else {
      return '<button type="button" class="add-profile-photo-button plus"></button>';
    }
  },
  page: ({ photoButtonHtmlString }) => {
    return `
        <div>
          <h2 class="page-title bold">회원가입</h2>
          <div class="signup-form-container">
            <form>
              <div>
                <div><strong class="bold"> 프로필 사진 </strong></div>
                <span class="error-message profile"></span>
                <div class="add-photo-container">
                  <div class="add-profile-photo-container">${photoButtonHtmlString}</div>
                </div>
              </div>

              <ul class="form-input-list">
                <li class="input-container">
                  <label for="email">이메일</label>
                  <input id="email" class="input-email" type="email" name="email" placeholder="이메일을 입력하세요" />
                  <span class="error-message email"></span>
                </li>
                <li class="input-container">
                  <label for="password">비밀번호</label>
                  <input type="password" id="password" name="password" />
                  <span class="error-message password">1</span>
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
          <input name="profileImgUrl" type="file" accept="image/*" class="add-photo-file-input" />
        </div>
    `;
  },
};
