import Header from "./Header.js";

function Login({ $target, initialState }) {
  this.target = $target;
  this.state = initialState;
  this.$loginPage = document.createElement("div");
  this.$loginPage.classList.add("login-container");

  this.header = new Header({ $target: this.target, initialState: this.state });

  this.render = () => {
    this.target.innerHTML = `
    <div class="login-page">
      <div class="login-container">
        <h2 class="login-title">로그인</h2>
        <div>
          <form>
            <div class="input-container">
              <label>이메일</label>
              <input placeholder="이메일을 입력하세요">
            </div>
            <div class="input-container">
              <label>비밀번호</label>
              <input placeholder="비밀번호를 입력하세요"/>
            </div>
            
            <button type="submit" class="submit-button" >로그인</button>
          </form>
          <div class="signup-container">
            <a href="/signup" >회원가입</a>
          </div>
        </div>
      </div>
    `;
  };

  this.render();
}
export default Login;
