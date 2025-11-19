import { formatToLocalDateTime } from "../../lib/utils.js";

function CommentList({ $target, comments, onModify, onDelete }) {
  this.$target = $target;
  this.$element = document.createElement("ul");
  this.$element.classList.add("post-comment-list");
  this.onModify = onModify;
  this.onDelete = onDelete;

  this.$target.appendChild(this.$element);

  this.state = {
    comments: comments ?? [],
    openDropdown: null,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.onDropdownToggle = commentId => {
    const isNowOpen = this.state.openDropdown === commentId;
    this.setState({
      openDropdown: isNowOpen ? null : commentId,
    });
  };

  this.handleClick = target => {
    const $button = target.closest("button");
    if (!$button) {
      return;
    }

    const $li = target.closest("li.post-comment");
    const { commentId, authorId } = $li?.dataset;

    if ($button.dataset.action === "toggle-menu") {
      this.onDropdownToggle(commentId);
    } else if ($button.dataset.action === "post-modify") {
      this.onModify(commentId, authorId);
    } else if ($button.dataset.action === "post-delete") {
      this.onDelete(commentId, authorId);
    }
  };

  this.bindEvents = () => {
    this.$element.addEventListener("click", event => {
      this.handleClick(event.target, event.target?.dataset?.mode);
    });
  };

  this.render = () => {
    const { comments } = this.state;

    const commentsHtmlString = comments
      .map(comment => {
        const { nickname, profileImageUrl } = comment.author;
        return `
          <li class="post-comment comment-item" data-comment-id=${comment.commentId} data-author-id=${comment.author.id}>
            <div class="post-basic-info">
              <div class="post-author-info">
                <div class="post-author-container left">
                  <div class="post-author-container">
                    <div class="post-avatar avatar">
                      ${profileImageUrl ? `<img src=${profileImageUrl} />` : ""}
                    </div>
                    <span class="post-author bold">${nickname ?? "-"}</span>
                  </div>
                  <span class="post-info-item">${comment.updatedAt ? formatToLocalDateTime(comment.updatedAt) : "-"}</span>
                </div>
                <div class="post-author-container right">
                  <div class="dropdown-button-container">
                    <button class="dropdown-button" data-action="toggle-menu">
                      <div style="width: 20px; height: 20px;">
                        <i class="fa-solid fa-ellipsis fa-lg"></i>
                      </div>
                    </button>
                    <ul class="dropdown-list ${this.state.openDropdown === comment.commentId ? "" : "none"}">
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
            </div>
            <div class="comment-content">
              <span class="post-comment-content">
                ${comment.content ?? ""}
              </span>
            </div>
          </li>
        `;
      })
      .join("");
    this.$element.innerHTML = commentsHtmlString;
  };

  this.render();
  this.bindEvents();
}

export default CommentList;
