function PostListItem({ $target, post, onClick }) {
  this.$target = $target;
  this.post = post;
  this.$post = document.createElement("li");
  this.$post.className = "post";
  this.$post.dataset.postId = this.post.id;

  this.render = () => {
    const {
      id,
      title,
      likeCount,
      commentCount,
      viewCount,
      createdAt,
      authorName,
    } = this.post;
    const htmlString = `<li class="post" data-post-id="${id}">
          <div class="post-top">
            <div class="post-title bold">${title}</div>
            <div class="post-info">
              <div class="post-info left">
                <div class="post-info-item"><span>좋아요 ${likeCount}</span></div>
                <div class="post-info-item"><span>댓글 ${commentCount}</span></div>
                <div class="post-info-item"><span>조회수 ${viewCount}</span></div>
              </div>
              <div class="post-info right">
                <div class="post-info-item"><span>${createdAt}</span></div>
              </div>
            </div>
          </div>
          <div class="post-bottom">
            <div class="post-author-container">
              <div class="post-avatar avatar"></div>
              <span class="post-author bold">${authorName}</span>
            </div>
          </div>
        </li>`;

    this.$post.innerHTML = htmlString;
    this.$target.appendChild(this.$post);
  };

  this.bindEvents = () => {
    this.$post.addEventListener("click", onClick);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default PostListItem;
