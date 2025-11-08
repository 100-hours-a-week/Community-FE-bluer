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
      <button class="dropdown-button" data-role="menu">
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
      <div class="header-back-button-container"> 
        <button data-role="back">
          <img style="height:100%" src="./public/left-arrow.png" />
        </button>
      </div>
    `;
  };

  this.render = () => {
    const { isLoggedIn, history } = getState();
    const currentPage = history[history.length - 1];

    this.$header.classList.add("header");
    this.$header.innerHTML = `
      <div class="header-content">
            ${
              this.haveBackButtonOnPage(currentPage)
                ? this.renderBackButton()
                : `<div style="width: 19px"></div>`
            }
          <span class="header-title bold">아무 말 대잔치</span>
          ${
            isLoggedIn
              ? `
                  <button class="dropdown-button" data-role="menu">
                    <div class="avatar"><img src="./public/profile-sample.jpeg" /></div> 
                  </button>
            `
              : '<div class="avatar bg-none"></div>'
          }
        </div>
      </div>
      
      `;
    this.target.appendChild(this.$header);
  };

  this.onBackClick = () => {};

  this.onDropdownToggle = () => {};

  this.onDropdownItemClick = () => {};

  this.handleClick = event => {
    if (event.target.closest(".header-back-button-container")) {
      console.log("back");
    } else if (event.target.closest(".dropdown-button")) {
      console.log("toggle dropdown");
    }
  };
  this.bindEvents = () => {
    this.$header.addEventListener("click", event => {
      this.handleClick(event);
    });
  };

  this.init = () => {
    const { isLoggedIn, history } = getState();
    this.setState({ isLoggedIn, history });

    this.render();
    this.bindEvents();
  };

  this.init();
}

export default Header;
