import { $ } from "../lib/dom.js";
import { getState } from "../lib/store.js";
import { DUMMY_POSTS } from "../lib/constants.js";
import { restClient } from "../lib/api.js";

function PostDetail({ $target, moveTo, initialState = {} }) {
  this.$target = $target;
  this.moveTo = moveTo;
  this.state = {
    ...initialState,
    post: {
      id: null,
      title: "",
      content: "",
      author: "",
      createdAt: "",
      likes: 0,
      comments: 0,
      views: 0,
    },
  };
  this.element = document.createElement("div");
  this.element.className = "post-detail-page";

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.render = () => {
    const { post } = this.state;
    const { title, content, author, createdAt, likes, comments, views } = post;

    const htmlString = `
      <div class="post-basic-info">
        <h1 class="post-title bold">${title}</h1>
        <div class="post-author-info">
          <div class="post-author-container left">
            <div class="post-author-container">
              <div class="post-avatar avatar"></div>
              <span class="post-author bold">${author}</span>
            </div>
            <span class="post-info-item">${createdAt}</span>
          </div>
          <div class="post-author-container right">
            <button class="post-author-container-button post-modify">수정</button>
            <button class="post-author-container-button post-delete">삭제</button>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <main class="post-content-container">
        <div class="post-content">
          <div class="post-content-image"></div>
          <p>
            ${content}
          </p>
        </div>
        <ul class="post-stats">
          <li class="post-stats-item bold">
            <span class="item-content">${likes}</span>
            <span class="item-title">좋아요수</span>
          </li>
          <li class="post-stats-item bold">
            <span class="item-content">${views}</span>
            <span class="item-title">조회수</span>
          </li>
          <li class="post-stats-item bold">
            <span class="item-content">${comments}</span>
            <span class="item-title">댓글</span>
          </li>
        </ul>
        <div class="divider"></div>
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
        <ul class="post-comment-list">
          <li class="post-comment">
            <div class="post-author-info">
              <div class="post-author-container left">
                <div class="post-author-container">
                  <div class="post-avatar avatar"></div>
                  <span class="post-author bold">더미 작성자 1</span>
                </div>
                <span class="post-info-item">2021-01-01 00:00:00</span>
              </div>
              <div class="post-author-container right post-comment">
                <button class="post-author-container-button comment-modify">수정</button>
                <button class="post-author-container-button comment-delete">삭제</button>
              </div>
            </div>
            <p class="post-comment-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate illum itaque facilis quisquam debitis laudantium a
              nisi, commodi quas exercitationem sit eligendi, aliquid architecto
              unde eaque ipsum dolorem tenetur hic.
            </p>
          </li>
         </ul>
      </main>`;

    this.element.innerHTML = htmlString;
    this.$target.appendChild(this.element);
  };

  this.onClickPostModify = () => {
    this.moveTo("post-edit", { postId: this.state.post.id });
  };

  this.onClickPostDelete = async () => {
    console.log("click");
    await restClient.get("/posts/84e43942-7d5e-41aa-a314-8f0148c032b7");
  };

  this.onClickCommentModify = async () => {};

  this.onClickCommentDelete = () => {};

  this.bindEvents = () => {
    const $postModifyButton = $(".post-modify", this.element);
    const $postDeleteButton = $(".post-delete", this.element);

    $postModifyButton.addEventListener("click", this.onClickPostModify);
    $postDeleteButton.addEventListener("click", this.onClickPostDelete);
    /*
      1) 포스트 수정 버튼 누르면 페이지 이동 => author에게만 허용
      2) 포스트 삭제 버튼 누르면 삭제 모달 => author에게만 허용
      3) 좋아요 버튼 active / inactive
      4) 댓글 입력 글자수에 따른 버튼 상태 관리 핸들링
      5) 댓글 수정
    */
  };

  this.init = () => {
    const postId =
      getState().history[getState().history.length - 1].query.postId;
    const post = DUMMY_POSTS.find(post => post.id === postId);

    this.setState({ post: { ...post } });

    this.render();
    this.bindEvents();
  };
}

export default PostDetail;
