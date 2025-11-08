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

  this.haveBackButtonOnPage = page => {
    const haveBackButtonPages = [
      "post-detail",
      "post-edit",
      "post-create",
      "signup",
    ];

    return haveBackButtonPages.includes(page);
  };

  this.renderDropdownButton = () => {
    const { isLoggedIn } = getState();

    return `
      <button class="dropdown-button">
      ${
        isLoggedIn
          ? '<div class="avatar"><img src="./public/profile-sample.jpeg" /></div>'
          : '<div class="avatar bg-none"></div>'
      }
      </button>
    `;
  };

  this.renderBackButton = () => {
    return `
      <button>
        <img style="height:100%" src="./public/left-arrow.png" />
      </button>
    `;
  };

  this.render = () => {
    this.$header.classList.add("header");
    this.$header.innerHTML = `
      <div class="header-content">
         <div class="header-back-button-container"> 
            ${
              this.haveBackButtonOnPage(this.state.currentPage)
                ? this.renderBackButton()
                : `<div style="width: 19px"></div>`
            }
          </div>
          <span class="header-title bold">아무 말 대잔치</span>
          ${this.renderDropdownButton()}
        </div>
      </div>
      
      `;
    this.target.appendChild(this.$header);
  };

  this.init = () => {
    const { isLoggedIn, currentPage } = getState();
    this.setState({ isLoggedIn, currentPage });

    this.render();
  };
}

export default Header;
