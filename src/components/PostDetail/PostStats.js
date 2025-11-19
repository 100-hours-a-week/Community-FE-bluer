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
    const { likeCount, viewCount, commentCount, likedByMe } = this.state;

    this.$element.innerHTML = `
      <li>
        <button class="post-stats-item post-like-button"}>
          <i class="fa-${likedByMe ? "solid" : "regular"} fa-heart fa-lg"></i>
          <span class="item-content">${likeCount && likeCount > 0 ? formatToK(likeCount) : 0}</span>
        </button>
      </li>
      <li class="post-stats-item ">
        <i class="fa-regular fa-comment fa-lg"></i>
        <span class="item-content">${commentCount ? formatToK(commentCount) : 0}</span>
      </li>  
      <li class="post-stats-item ">
        <i class="fa-solid fa-chart-column fa-lg"></i>
        <span class="item-content">${viewCount && viewCount > 0 ? formatToK(viewCount) : 0}</span>
      </li>
    `;
  };

  this.render();
  this.bindEvents();
}

export default PostStats;
