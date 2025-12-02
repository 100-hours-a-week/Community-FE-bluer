import { formatToK, formatToLocalDateTime } from "../lib/utils.js";

function PostListItem({ $target, post }) {
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
              ? `<div class="post-image-container">
                <img src=${postImageUrl} />
              </div>`
              : ""
          }
      </div>
      <div>
        <ul class="post-stats">
          <li>
            <i class="fa-regular fa-heart fa-lg"></i>
            <span class="item-content">${likeCount && likeCount > 0 ? formatToK(likeCount) : 0}</span>
          </li>
          <li class="post-stats-item ">
            <i class="fa-regular fa-comment fa-lg"></i>
            <span class="item-content">${commentCount ? formatToK(commentCount) : 0}</span>
          </li>  
          <li class="post-stats-item ">
            <i class="fa-solid fa-chart-column fa-lg"></i>
            <span class="item-content">${viewCount && viewCount > 0 ? formatToK(viewCount) : 0}</span>
          </li>
        </ul>
      </div>
    </div>
  `;

    this.$post.innerHTML = htmlString;
    this.$target.appendChild(this.$post);
  };

  this.cleanUp = () => {};

  this.init = () => {
    this.render();
  };

  this.init();
}

export default PostListItem;
