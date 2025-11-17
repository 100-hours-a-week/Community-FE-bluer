import { $ } from "../../lib/dom.js";

export default function PostBasicInfo({ $target, post, onModify, onDelete }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-basic-info");
  this.$target = $target;
  this.onModify = onModify;
  this.onDelete = onDelete;

  this.$target.appendChild(this.$element);

  this.state = {
    title: "",
    authorName: "",
    authorProfileImageUrl: "",
    createdAt: "",
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
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
    const $button = event.target.closest("button");

    if (!$button) {
      return;
    }

    if ($button.dataset.action === "post-modify") {
      this.onModify?.();
    } else if ($button.dataset.action === "post-delete") {
      this.onDelete?.();
    } else if ($button.dataset.action === "toggle-menu") {
      this.onDropdownToggle();
    }
  };

  this.bindEvents = () => {
    if (this.isBound) {
      return;
    }

    this.$element.addEventListener("click", this.handleClick);
    this.isBound = true;
  };

  this.render = () => {
    const { title, authorName, authorProfileImageUrl, createdAt } = this.state;
    this.$element.innerHTML = `
      <div class="post-basic-info">
        <div class="post-author-info">
          <div class="post-author-container left">
            <div class="post-author-container">
              <div class="post-avatar avatar">
                ${authorProfileImageUrl ? `<img src=${authorProfileImageUrl} />` : ""}
              </div>
              <span class="post-author bold">${authorName ?? "-"}</span>
            </div>
            <span class="post-info-item">${createdAt ?? "-"}</span>
          </div>
          <div class="post-author-container right">
            <div class="dropdown-button-container">
              <button class="dropdown-button" data-action="toggle-menu">
                <div style="width: 20px; height: 20px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>
                </div>
              </button>
              <ul class="dropdown-list ${this.state.isOpen ? "" : "none"} ">
                <li class="dropdown-item">
                  <div>
                    <button data-action="post-modify">
                      <span>수정</span>
                    </button>
                  </div>
                </li>
                <li class="dropdown-item">
                  <div>
                    <button data-action="post-delete">
                      <span>삭제</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1 class="post-title bold">${title ?? ""}</h1>
      </div>`;
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };
  this.init();
}
