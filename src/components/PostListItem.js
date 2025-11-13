import { formatToK, formatToLocalDateTime } from "../lib/utils.js";

function PostListItem({ $target, post, onClick }) {
  this.$target = $target;
  this.post = post;
  this.$post = document.createElement("li");
  this.$post.className = "post";
  this.$post.dataset.postId = this.post.postId;

  this.render = () => {
    const { title, likeCount, commentCount, viewCount, createdAt, authorName } =
      this.post;

    const htmlString = `
          <div class="post-top">
            <div class="post-title bold">${title}</div>
            <div class="post-info">
              <div class="post-info left">
                <div class="post-info-item"><span>좋아요 ${likeCount ? formatToK(likeCount) : 0}</span></div>
                <div class="post-info-item"><span>댓글 ${commentCount ? formatToK(commentCount) : 0}</span></div>
                <div class="post-info-item"><span>조회수 ${viewCount ? formatToK(viewCount) : 0}</span></div>
              </div>
              <div class="post-info right">
                <div class="post-info-item"><span>${createdAt ? formatToLocalDateTime(createdAt) : "-"}</span></div>
              </div>
            </div>
          </div>
          <div class="post-bottom">
            <div class="post-author-container">
              <div class="post-avatar avatar"></div>
              <span class="post-author bold">${authorName}</span>
            </div>
          </div>
        `;

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
