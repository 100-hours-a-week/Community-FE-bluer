import { getState } from "../lib/store.js";

function Header({ $target, initialState }) {
  this.target = $target;
  this.state = { ...initialState };
  this.$header = document.createElement("header");
  this.$header.classList.add("header");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  /*
    1. 로그인한 상태 -> 우측 유저 드롭다운 버튼
    2. 게시글 상세조회, 게시글 수정, 게시글 추가 페이지, 회원가입 -> 뒤로가기
  */

  this.renderBackButton = () => {};
  this.renderDropdownButton = () => {};

  this.render = () => {
    // TODO: 로그인 상태에 따른 조건부 렌더링
    this.$header.classList.add("header");
    this.$header.innerHTML = `
      <div class="header-content">
         <div class="header-back-button-container"> 
            <button>
              <img
                style="height:100%"
                src="./public/left-arrow.png"
              />
            </button>
          </div>
          <span class="header-title bold">아무 말 대잔치</span>
          <button class="dropdown-button">
            <div class="avatar">
              <img src="./public/profile-sample.jpeg" /> 
            </div>
          </button>
        </div>
      </div>
      
      `;
    this.target.appendChild(this.$header);
  };

  this.init = () => {
    const { isLoggedIn } = getState();
    this.setState({ isLoggedIn });

    this.render();
  };
}

export default Header;
