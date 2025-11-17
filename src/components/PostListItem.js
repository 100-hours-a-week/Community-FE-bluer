import { formatToK, formatToLocalDateTime } from "../lib/utils.js";

function PostListItem({ $target, post, onClick }) {
  this.$target = $target;
  this.post = post;
  this.$post = document.createElement("li");
  this.$post.className = "post";
  this.$post.dataset.postId = this.post.postId;

  this.render = () => {
    const {
      title,
      likeCount,
      commentCount,
      viewCount,
      createdAt,
      authorName,
      authorProfileImageUrl,
      content,
      postImageUrl,
    } = this.post;

    const htmlString = `
    <div class="post-avatar-container">
      <div class="post-avatar avatar">
        <img src="${authorProfileImageUrl}" />
      </div>
    </div>
    <div class="post-info-container">
      <div class="post-info-container-row">
        <span class="post-author bold">${authorName}</span>
        <time>${formatToLocalDateTime(createdAt)}</time>
      </div>
    </div>
    <div class="post-content-container" ">
      <div>
        <div class="post-title bold">${title}</div>
        <div class="post-content">
          ${content}
        </div>
        ${
          postImageUrl
            ? `
          <div class="post-image-container">
            <img src=${postImageUrl} />
          </div>`
            : ""
        }
      </div>
      <div>
        <div class="post-stats">
          <div class=""><span>좋아요 ${likeCount ? formatToK(likeCount) : 0}</span></div>
          <div class=""><span>댓글 ${commentCount ? formatToK(commentCount) : 0}</span></div>
          <div class=""><span>조회수 ${viewCount ? formatToK(viewCount) : 0}</span></div>
        </div>
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
