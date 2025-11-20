import { getState, dispatch, subscribe } from "../lib/store.js";
import { $ } from "../lib/dom.js";
import { showToast } from "../lib/utils.js";
import { apiManager } from "../lib/api/apiManager.js";
import { moveToPage } from "../lib/router.js";

function Header({ $target, initialState }) {
  this.target = $target;
  this.state = { isOpen: false, profileImageUrl: null, ...initialState };

  this.$header = document.createElement("div");
  this.$header.classList.add("header");
  this.isBound = false;

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.haveBackButtonOnPage = page => {
    const haveBackButtonPages = [
      "post-detail",
      "post-edit",
      "post-create",
      "signup",
      "user-info",
      "change-password",
    ];

    return haveBackButtonPages.includes(page);
  };

  this.renderBackButton = page => {
    return `
      <div class="header-back-button-container"> 
        ${
          this.haveBackButtonOnPage(page)
            ? `<button class="back-button-container" data-action="router-back">
              <i class="fa-solid fa-arrow-left fa-xl"></i>
            </button>`
            : `<div data-action="back-button-container"></div>`
        }
      </div>
    `;
  };

  this.renderUserMenu = isLoggedIn => {
    if (!isLoggedIn) {
      return `<button class="header-login-button" data-action="login">로그인</button>`;
    }
    return `
      <div class="dropdown-button-container">
        <button class="dropdown-button" data-action="toggle-menu">
          <div class="avatar">
            ${
              this.state.profileImageUrl
                ? `<img src=${this.state.profileImageUrl} />`
                : ""
            }
          </div> 
        </button>
        <ul class="dropdown-list ${this.state.isOpen ? "" : "none"} ">
          <li class="dropdown-item">
            <div>
              <button data-action="user-info">
                <span>회원 정보 수정</span>
              </button>
            </div>
          </li>
          <li class="dropdown-item">
            <div>
              <button data-action="change-password">
                <span>비밀번호 수정</span>
              </button>
            </div>
          </li>
          <li class="dropdown-item">
            <div>
              <button data-action="logout">
                <span>로그아웃</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    `;
  };

  const renderLogoContainer = page => {
    if (page === "user-info") {
      return `<span class="bold">프로필 편집</span>`;
    }
    if (page === "change-password") {
      return `<span class="bold">비밀번호 변경</span>`;
    }
    if (page === "post-create") {
      return `<span class="bold">커뮤니티 글쓰기</span>`;
    }
    if (page === "post-edit") {
      return `<span class="bold">게시글 수정</span>`;
    }
    if (page === "signup") {
      return `<span class="bold">회원가입</span>`;
    }
    return `
      <button data-action="router-post-list">
        <div class="header-logo-image-container">
          <img src="/public/logo.png" />
        </div>
      </button>
    `;
  };

  this.render = () => {
    const { isLoggedIn, currentPage } = getState();

    this.$header.innerHTML = `
          <div class="header-contents-container">
            ${this.renderBackButton(currentPage)}
            <div class="header-logo-container">
                ${renderLogoContainer(currentPage)}
            </div>
            <div class="header-container-right">
              ${this.renderUserMenu(isLoggedIn)}
            </div>
          </div>
      `;
    if (!this.$header.isConnected) {
      this.target.appendChild(this.$header);
    }
  };

  this.onBackClick = () => {
    history.back();
  };

  this.onDropdownToggle = () => {
    const $dropdownList = $(".dropdown-list", this.$header);
    if (!$dropdownList) {
      return;
    }

    this.setState({ isOpen: !this.state.isOpen });

    if (this.state.isOpen) {
      $dropdownList.classList.remove("none");
    } else {
      $dropdownList.classList.add("none");
    }
  };

  this.handleClick = event => {
    const { target } = event;

    const $closestButton = target.closest("button");
    if (!$closestButton) {
      return;
    }

    const { dataset } = $closestButton;
    const action = dataset?.action;

    const actionMap = {
      "router-post-list": () => {
        moveToPage("/posts");
      },
      login: () => {
        moveToPage("/login");
      },
      "toggle-menu": () => {
        this.onDropdownToggle();
      },
      "router-back": () => {
        this.onBackClick();
      },
      "user-info": () => {
        moveToPage("/user-info");
        this.onDropdownToggle();
      },
      "change-password": () => {
        moveToPage("/change-password");
        this.onDropdownToggle();
      },
      logout: () => {
        dispatch("LOGOUT");
        this.onDropdownToggle();
      },
    };
    actionMap[action]?.();
  };

  this.getUserProfile = async () => {
    try {
      const { data } = await apiManager.getUserProfile();

      this.setState({
        profileImageUrl: data.profileImageUrl,
      });
    } catch (error) {
      showToast(`Error: 유저 정보 조회 중 에러 발생`);
      console.error(error);
    }
  };

  this.bindEvents = () => {
    this.$header.addEventListener("click", this.handleClick);
  };

  this.init = async () => {
    const { isLoggedIn, history } = getState();
    this.setState({ isLoggedIn, history });

    if (this.state.isLoggedIn) {
      await this.getUserProfile();
    }

    this.bindEvents();

    subscribe((globalState, type) => {
      if (type === "SET_CURRENT_PAGE") {
        this.render();
      }
    });
  };
}

export default Header;
