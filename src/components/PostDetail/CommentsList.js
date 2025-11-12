function CommentList({ $target, comments }) {
  this.$target = $target;
  this.$element = document.createElement("ul");
  this.$element.classList.add("post-comment-list");

  this.$target.appendChild(this.$element);

  this.state = { comments: comments ?? [] };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.render = () => {
    const { comments } = this.state;

    const value = comments
      .map(comment => {
        return `
        <li class="post-comment">
          <div class="post-author-info">
            <div class="post-author-container left">
              <div class="post-author-container">
                <div class="post-avatar avatar"></div>
                <span class="post-author bold">${comment.author.nickname ?? "익명"}</span>
              </div>
              <span class="post-info-item">${comment.createdAt ?? "-"}</span>
            </div>
            <div class="post-author-container right post-comment">
              <button class="post-author-container-button comment-modify">수정</button>
              <button class="post-author-container-button comment-delete">삭제</button>
            </div>
          </div>
          <p class="post-comment-content">${comment.content ?? ""}</p>
        </li>`;
      })
      .join("");

    this.$element.innerHTML = value;
  };
}

export default CommentList;
