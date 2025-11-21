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
    const currentPage = history[history.length - 1]?.page ?? "login";

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
                      <div class="avatar">
                       ${this.state.profileImageUrl ? `<img src=${this.state.profileImageUrl} />` : ""}
                      </div> 
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
