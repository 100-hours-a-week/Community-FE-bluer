function CommentList({ $target, comments, onModify, onDelete }) {
  this.$target = $target;
  this.$element = document.createElement("ul");
  this.$element.classList.add("post-comment-list");

  this.$target.appendChild(this.$element);

  this.state = { comments: comments ?? [] };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.handleClick = (target, mode) => {
    if (target?.tagName !== "BUTTON") {
      return;
    }
    const { commentId, authorId } = target.closest("li").dataset;

    if (mode === "modify") {
      onModify(commentId, authorId);
    } else if (mode === "delete") {
      onDelete(commentId, authorId);
    }
  };

  this.bindEvents = () => {
    this.$element.addEventListener("click", event => {
      this.handleClick(event.target, event.target?.dataset?.mode);
    });
  };

  this.render = () => {
    const { comments } = this.state;

    const value = comments
      .map(comment => {
        return `
        <li class="post-comment" data-comment-id=${comment.commentId} data-author-id=${comment.author.id}>
          <div class="post-author-info">
            <div class="post-author-container left">
              <div class="post-author-container">
                <div class="post-avatar avatar"></div>
                <span class="post-author bold">${comment.author.nickname ?? "익명"}</span>
              </div>
              <span class="post-info-item">${comment.createdAt ?? "-"}</span>
            </div>
            <div class="post-author-container right post-comment">
              <button class="post-author-container-button comment-modify" data-mode="modify">수정</button>
              <button class="post-author-container-button comment-delete" data-mode="delete"">삭제</button>
            </div>
          </div>
          <p class="post-comment-content">${comment.content ?? ""}</p>
        </li>`;
      })
      .join("");

    this.$element.innerHTML = value;
  };

  this.render();
  this.bindEvents();
}

export default CommentList;
