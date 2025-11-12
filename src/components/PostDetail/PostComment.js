function PostComment({ $target }) {
  this.$target = $target;
  this.$element = document.createElement("div");
  this.$element.classList.add("post-comment-container");

  this.$target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
       <div class="post-comment-container">
          <div class="post-comment-textarea-wrapper">
            <textarea class="post-comment-textarea">작성할 댓글 내용</textarea>
          </div>
          <div class="divider"></div>
          <div class="post-comment-submit-button-container">
            <button class="post-comment-submit-button">
              <span>댓글 등록</span>
            </button>
          </div>
        </div>
    `;

    this.$target.appendChild(this.$element);
  };

  this.render();
}

export default PostComment;
