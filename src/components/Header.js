import { getState, dispatch } from "../lib/store.js";
import { $ } from "../lib/dom.js";
import { showToast } from "../lib/utils.js";
import { apiManager } from "../lib/api/apiManager.js";

function Header({ $target, moveTo, toBack, initialState }) {
  this.target = $target;
  this.moveTo = moveTo;
  this.toBack = toBack;
  this.state = { isOpen: false, profileImageUrl: null, ...initialState };

  this.$header = document.createElement("header");
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
    ];

    return haveBackButtonPages.includes(page);
  };

  this.renderBackButton = page => {
    const haveBackButtonPages = [
      "post-detail",
      "post-edit",
      "post-create",
      "signup",
      "user-info",
      "withdrawal",
    ];

    return `
      <div class="header-back-button-container"> 
        ${
          haveBackButtonPages.includes(page)
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

  this.render = () => {
    const { isLoggedIn, history } = getState();
    const currentPage = history.at(-1)?.page || "login";

    this.$header.innerHTML = `
          <div class="header-contents-container">
            ${this.renderBackButton(currentPage)}
            <div class="header-logo-container">
                ${
                  currentPage === "user-info"
                    ? "<span class=`bold`>프로필 편집</span>"
                    : `
                        <button data-action="router-post-list">
                          <div class="header-logo-image-container">
                            <img src="/public/logo.png" />
                          </div>
                        </button>
                      `
                }
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
    this.toBack();
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
        this.moveTo("post-list");
      },
      login: () => {
        this.moveTo("login");
      },
      "toggle-menu": () => {
        this.onDropdownToggle();
      },
      "router-back": () => {
        this.onBackClick();
      },
      "user-info": () => {
        this.moveTo("user-info");
        this.onDropdownToggle();
      },
      "change-password": () => {
        this.moveTo("change-password");
        this.onDropdownToggle();
      },
      logout: () => {
        dispatch("LOGOUT");
        this.onDropdownToggle();
      },
    };
    actionMap[action]?.();
  };

  this.bindEvents = () => {
    if (this.isBound) {
      return;
    }

    this.boundHeaderClick = event => {
      this.handleClick(event);
    };
    this.$header.addEventListener("click", this.boundHeaderClick);
    this.isBound = true;
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

  this.init = async () => {
    const { isLoggedIn, history } = getState();
    this.setState({ isLoggedIn, history });

    if (this.state.isLoggedIn) {
      await this.getUserProfile();
    }

    this.render();
    this.bindEvents();
  };
}

export default Header;
