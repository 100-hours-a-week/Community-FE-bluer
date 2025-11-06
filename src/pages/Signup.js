function Signup({ $target, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.$signupPage = document.createElement("div");
  this.$signupPage.classList.add("signup-page", "page-layout");

  this.render = () => {
    this.$signupPage.innerHTML = `
        <div class="zz">
          <h2 class="page-title">회원가입</h2>
          <div class="signup-form-container">
            <form>
              <div>
                <div>
                  <strong style="font-weight: 600"> 프로필 사진 </strong>
                </div>
                <span class="error-message profile"></span>
                <div class="add-photo-container">
                  <button class="add-photo-button"></button>
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
                  <span class="error-message email"></span>
                </li>
                <li class="input-container">
                  <label for="password-check">비밀번호 확인</label>
                  <input
                    type="password"
                    id="password-check"
                    name="password-check"
                  />
                  <span class="error-message email"></span>
                </li>
                <li class="input-container">
                  <label for="nickname">닉네임</label>
                  <input type="text" id="nickname" name="nickname" />
                  <span class="error-message email"></span>
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
        </div>
    `;
    this.target.appendChild(this.$signupPage);
  };
  this.init = () => {
    console.log("Signup 페이지입니다.");
    this.render();
  };
}

export default Signup;
