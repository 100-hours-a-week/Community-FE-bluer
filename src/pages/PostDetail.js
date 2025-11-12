import { $ } from "../lib/dom.js";
import { getCurrentPageInfo } from "../lib/store.js";
import { apiManager } from "../lib/api/apiManager.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { showToast } from "../lib/utils.js";
import PostBasicInfo from "../components/PostDetail/PostBasicInfo.js";
import PostContent from "../components/PostDetail/PostContent.js";
import Divider from "../components/Divider.js";
import PostStats from "../components/PostDetail/PostStats.js";
import CommentList from "../components/PostDetail/CommentsList.js";
import PostComment from "../components/PostDetail/PostComment.js";

function PostDetail({ $target, moveTo, initialState = {} }) {
  this.$target = $target;
  this.moveTo = moveTo;
  this.state = {
    ...initialState,
    post: {
      postId: null,
      title: "",
      content: "",
      author: "",
      createdAt: "",
      likeCount: 0,
      commentsCount: 0,
      viewsCount: 0,
    },
  };
  this.element = document.createElement("div");
  this.element.className = "post-detail-page";

  this.postBasicInfo = new PostBasicInfo({ $target: this.element });

  new Divider({ $target: this.element });

  this.postContent = new PostContent({
    $target: this.element,
    post: this.state.post,
  });
  this.postStats = new PostStats({
    $target: this.element,
    post: this.state.post,
  });

  new Divider({ $target: this.element });

  this.postComment = new PostComment({
    $target: this.element,
  });

  this.commentList = new CommentList({
    $target: this.element,
    post: this.state.post,
  });

  this.setState = newState => {
    this.state = { ...this.state, ...newState };

    this.postBasicInfo.setState(this.state.post);
    this.postContent.setState(this.state.post);
    this.postStats.setState(this.state.post);

    // this.postComment.setState(this.state.post.comments);
    this.commentList.setState(this.state.post);
  };

  this.render = () => {};

  this.onClickPostModify = () => {
    this.moveTo("post-edit", { postId: this.state.post.id });
  };

  this.onClickPostDelete = async () => {
    console.log("click");
  };

  this.onClickCommentModify = async () => {};

  this.onClickCommentDelete = () => {};

  this.getPost = async postId => {
    try {
      const response = await apiManager.getPost(postId);

      if (response.status === StatusCode.OK) {
        this.setState({ post: response.data });
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.bindEvents = () => {
    const $postModifyButton = $(".post-modify", this.element);
    const $postDeleteButton = $(".post-delete", this.element);

    $postModifyButton.addEventListener("click", this.onClickPostModify);
    $postDeleteButton.addEventListener("click", this.onClickPostDelete);
    /*
      0) 댓글 fetch
      1) 댓글 입력 글자수에 따른 버튼 상태 관리 핸들링
      2) 댓글 수정
      3) 포스트 수정 버튼 누르면 페이지 이동 => author에게만 허용
      4) 포스트 삭제 버튼 누르면 삭제 모달 => author에게만 허용
      5) 좋아요 버튼 active / inactive => login한 유저에게만 허용
    */
  };

  this.init = async () => {
    const { query } = getCurrentPageInfo();
    const { postId } = query;

    await this.getPost(postId);

    this.$target.appendChild(this.element);
    this.render();
    // this.bindEvents();
  };
}

export default PostDetail;
