import { truncateText } from "../lib/utils.js";
import { POST_TITLE_MAX_LENGTH } from "../lib/constants.js";

function PostList({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.state = {
    ...initialState,
  };

  this.$postList = document.createElement("div");
  this.$postList.classList.add("post-list-page", "page-layout");

  this.shortenTitle = title => {
    return title.length > POST_TITLE_MAX_LENGTH
      ? truncateText(title, POST_TITLE_MAX_LENGTH)
      : title;
  };
  this.render = () => {
    // TODO: Apply API
    const title = this.shortenTitle(
      "제목제목제목제목제목제목제목제목제목제목제목제목제목"
    );

    this.$postList.innerHTML = `
       <div class="introduction" style="text-align: center">
        <span>안녕하세요,</span>
        <br />
        <div>
          아무 말 대잔치
          <strong style="font-weight: 700">게시판</strong> 입니다.
        </div>
      </div>

      <div class="add-post-button-container">
        <button class="add-post-button">
          <span> 게시글 작성 </span>
        </button>
      </div>

      <ul class="post-list">
        <li class="post">
          <div class="post-top">
            <div class="post-title bold">${title}</div>
            <div class="post-info">
              <div class="post-info left">
                <div class="post-info-item">
                  <span>좋아요 0</span>
                </div>
                <div class="post-info-item">
                  <span>댓글 0</span>
                </div>
                <div class="post-info-item">
                  <span>조회수 0</span>
                </div>
              </div>
              <div class="post-info right">
                <div class="post-info-item">
                  <span>2021-01-01 00:00:00</span>
                </div>
              </div>
            </div>
          </div>
          <div class="post-bottom">
            <div class="post-author-container">
              <div class="post-avatar"></div>
              <span class="post-author bold">더미 작성자 1</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    `;
    this.target.appendChild(this.$postList);
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.bindEvents = () => {
    const $postTitle = $(".post-title", this.$postList);
  };

  this.init = () => {
    this.render();
    this.bindEvents;
  };

  this.render();
}

export default PostList;
