import { truncateText } from "../lib/utils.js";
import { POST_TITLE_MAX_LENGTH, DUMMY_POSTS } from "../lib/constants.js";

function PostList({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = {
    ...initialState,
  };

  this.$postListPage = document.createElement("div");
  this.$postListPage.classList.add("post-list-page", "page-layout");
  this.$introductionArea = document.createElement("div");
  this.$introductionArea.classList.add("introduction");
  this.$addPostButtonContainer = document.createElement("div");
  this.$addPostButtonContainer.classList.add("add-post-button-container");
  this.$postList = document.createElement("ul");
  this.$postList.classList.add("post-list");

  this.shortenTitle = title => {
    return title.length > POST_TITLE_MAX_LENGTH
      ? truncateText(title, POST_TITLE_MAX_LENGTH)
      : title;
  };
  this.render = () => {
    this.$introductionArea.innerHTML = `
    <span>안녕하세요,</span>
    <br />
    <div>
    아무 말 대잔치
    <span class="bold">게시판</span> 입니다.
    </div>
    `;

    this.$addPostButtonContainer.innerHTML = `
    <button class="add-post-button">
    <span> 게시글 작성 </span>
    </button>
    `;

    // TODO: Apply API
    this.$postList.innerHTML = DUMMY_POSTS.map(post => {
      const title = this.shortenTitle(post.title);

      return `
        <li class="post" data-post-id="${post.id}">
          <div class="post-top">
            <div class="post-title bold">${title}</div>
            <div class="post-info">
              <div class="post-info left">
                <div class="post-info-item"><span>좋아요 ${post.likes}</span></div>
                <div class="post-info-item"><span>댓글 ${post.comments}</span></div>
                <div class="post-info-item"><span>조회수 ${post.views}</span></div>
              </div>
              <div class="post-info right">
                <div class="post-info-item"><span>${post.createdAt}</span></div>
              </div>
            </div>
          </div>
          <div class="post-bottom">
            <div class="post-author-container">
              <div class="post-avatar"></div>
              <span class="post-author bold">${post.author}</span>
            </div>
          </div>
        </li>
      `;
    }).join("");

    this.$postListPage.appendChild(this.$introductionArea);
    this.$postListPage.appendChild(this.$addPostButtonContainer);
    this.$postListPage.appendChild(this.$postList);

    this.target.appendChild(this.$postListPage);
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.onClickPost = event => {
    const $post = event.target.closest(".post");

    if (!$post) {
      return;
    }

    const postId = $post?.dataset?.postId;

    // TODO: 이동
    alert(`postId: ${postId}인 게시글로 이동`);
  };

  this.bindEvents = () => {
    this.$postList.addEventListener("click", this.onClickPost);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.render();
}

export default PostList;
