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
    ];

    if (!haveBackButtonPages.includes(page)) {
      return `<div style="width: 36px"></div>`;
    }

    return `
      <div class="header-back-button-container"> 
        <button data-action="router-back">
          <img style="height:100%" src="./public/left-arrow.png" />
        </button>
      </div>
    `;
  };

  this.renderUserMenu = isLoggedIn => {
    if (!isLoggedIn) {
      return `<button class="header-button" data-action="login">로그인</button>`;
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
            <button data-action="user-info">회원정보수정</button>
          </li>
          <li class="dropdown-item">
            <button data-action="change-password">비밀번호수정</button>
          </li>
          <li class="dropdown-item">
            <button data-action="logout">로그아웃</button>
          </li>
        </ul>
      </div>
    `;
  };

  this.render = () => {
    const { isLoggedIn, history } = getState();
    const currentPage = history.at(-1)?.page || "login";

    this.$header.innerHTML = `
      <div class="header-content">
        <nav>
            ${this.renderBackButton(currentPage)}
            <div class="header-logo-container">
                <button data-action="router-post-list">
                  <div class="header-logo-image-container">
                    <img src="/public/logo.png" />
                  </div>
                </button>
            </div>
            ${this.renderUserMenu(isLoggedIn)}
          </nav>
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
