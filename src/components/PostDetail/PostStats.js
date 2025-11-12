function PostStats({ $target, post }) {
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

  this.render = () => {
    // console.log("post stats this.state");
    // console.log(this.state);
    const { likeCount, viewCount, commentCount } = this.state;
    this.$element.innerHTML = `
      <li class="post-stats-item bold">
        <span class="item-content">${likeCount ?? 0}</span>
        <span class="item-title">좋아요수</span>
      </li>
      <li class="post-stats-item bold">
        <span class="item-content">${viewCount ?? 0}</span>
        <span class="item-title">조회수</span>
      </li>
      <li class="post-stats-item bold">
        <span class="item-content">${commentCount ?? 0}</span>
        <span class="item-title">댓글</span>
      </li>
    `;
  };

  this.render();
}

export default PostStats;
