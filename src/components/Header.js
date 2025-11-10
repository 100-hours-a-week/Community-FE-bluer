import { getState, dispatch } from "../lib/store.js";
import { $ } from "../lib/dom.js";

function Header({ $target, moveTo, initialState }) {
  this.target = $target;
  this.moveTo = moveTo;
  this.state = { isOpen: false, ...initialState };

  this.$header = document.createElement("header");
  this.$header.classList.add("header");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  /*
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
    const currentPage = history[history.length - 1].page;

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
                  <div class="dropdown-button-container">
                    <button class="dropdown-button" data-role="menu">
                      <div class="avatar"><img src="./public/profile-sample.jpeg" /></div> 
                    </button>
                    <ul class="dropdown-list none">
                      <li class="dropdown-item" data-action="user-info">회원정보수정</li>
                      <li class="dropdown-item" data-action="change-password">비밀번호수정</li>
                      <li class="dropdown-item" data-action="logout">로그아웃</li>
                    </ul>
                  </div>
            `
              : '<div class="avatar bg-none"></div>'
          }
        </div>
      </div>
      
      `;
    this.target.appendChild(this.$header);
  };

  this.onBackClick = () => {};

  this.onDropdownToggle = () => {
    const $dropdownList = $(".dropdown-list");

    this.setState({ isOpen: !this.state.isOpen });

    if (this.state.isOpen) {
      $dropdownList.classList.remove("none");
    } else {
      $dropdownList.classList.add("none");
    }
  };

  this.onDropdownItemClick = target => {
    const action = target.dataset?.action;
    const actionMap = {
      "user-info": () => {
        this.moveTo("user-info");
      },
      "change-password": () => {
        this.moveTo("change-password");
      },
      logout: () => {
        dispatch("LOGOUT");
      },
    };

    this.onDropdownToggle();
    actionMap[action]?.();
  };

  this.handleClick = event => {
    const { target } = event;

    if (target.closest(".header-back-button-container")) {
      this.onBackClick();
    } else if (target.closest(".dropdown-button")) {
      this.onDropdownToggle();
    } else if (target.closest(".dropdown-item")) {
      this.onDropdownItemClick(event.target);
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
