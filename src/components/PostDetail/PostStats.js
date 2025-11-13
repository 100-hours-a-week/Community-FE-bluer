import { formatToK } from "../../lib/utils.js";

function PostStats({ $target, post, handleClick }) {
  this.$element = document.createElement("ul");
  this.$element.classList.add("post-stats");
  $target.appendChild(this.$element);

  this.state = {
    ...post,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.handleClick = event => {
    const $button = event.target.closest("button");

    if (!$button) {
      return;
    }
    handleClick();
  };

  this.bindEvents = () => {
    this.$element.addEventListener("click", this.handleClick);
  };

  this.render = () => {
    const { likeCount, viewCount, commentCount } = this.state;
    this.$element.innerHTML = `
      <li>
        <button class="post-stats-item bold ${this.state.likedByMe ? "active" : ""} "}>
          <span class="item-content">${formatToK(likeCount) ?? 0}</span>
          <span class="item-title">좋아요수</span>
        </button>
      </li>
      <li class="post-stats-item bold">
        <span class="item-content">${formatToK(viewCount) ?? 0}</span>
        <span class="item-title">조회수</span>
      </li>
      <li class="post-stats-item bold">
        <span class="item-content">${formatToK(commentCount) ?? 0}</span>
        <span class="item-title">댓글</span>
      </li>
    `;
  };

  this.render();
  this.bindEvents();
}

export default PostStats;
