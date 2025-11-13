import { $ } from "../lib/dom.js";
import { getCurrentPageInfo, getState } from "../lib/store.js";
import { apiManager } from "../lib/api/apiManager.js";
import { StatusCode } from "../lib/api/statusCode.js";
import { showModal, showToast } from "../lib/utils.js";
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
      authorId: "",
      authorNamae: "",
      authorProfileImageUrl: "",
      createdAt: "",
      postImageUrl: null,
      likeCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      likedByMe: false,
    },
    comments: [],
    editingComment: null,
  };
  this.element = document.createElement("div");
  this.element.className = "post-detail-page";
  this.getCurrentUserId = () => getState().userId;

  this.postBasicInfo = new PostBasicInfo({ $target: this.element });

  new Divider({ $target: this.element });

  this.postContent = new PostContent({
    $target: this.element,
    post: this.state.post,
  });
  this.postStats = new PostStats({
    $target: this.element,
    post: this.state.post,
    handleClick: () => {
      this.onClickLike();
    },
  });

  new Divider({ $target: this.element });

  this.postComment = new PostComment({
    $target: this.element,
    onSubmit: event => this.onSubmitComment(event),
  });

  this.commentList = new CommentList({
    $target: this.element,
    comments: this.state.comments,
    onModify: (commentId, authorId) => {
      this.onClickCommentModify(commentId, authorId);
    },
    onDelete: (commentId, authorId) =>
      this.onClickCommentDelete(commentId, authorId),
  });

  this.setState = newState => {
    this.state = { ...this.state, ...newState };

    this.postBasicInfo.setState(this.state.post);
    this.postContent.setState(this.state.post);
    this.postStats.setState(this.state.post);

    this.commentList.setState({ comments: this.state.comments });
  };

  this.onSubmitComment = async content => {
    try {
      const { editingComment, post } = this.state;

      let response;
      if (editingComment) {
        response = await apiManager.updateComment({
          postId: post.postId,
          commentId: editingComment.commentId,
          content,
        });
      } else {
        response = await apiManager.postComment({
          postId: post.postId,
          content,
        });
      }

      if (response.status === StatusCode.OK) {
        await this.init();
        this.setState({ editingComment: null });
      }
    } catch (error) {
      console.error(error);
      showToast("댓글 처리 중 오류가 발생했습니다.");
    }
  };

  this.render = () => {};

  this.onClickPostModify = () => {
    const currentUserId = this.getCurrentUserId();
    const authorId = this.state.post.authorId;

    if (authorId !== currentUserId) {
      showToast("권한이 없습니다.");
      return;
    }
    this.moveTo("post-edit", { postId: this.state.post.postId });
  };

  this.deletePost = async () => {
    try {
      const postId = this.state.post.postId;
      const response = await apiManager.deletePost(postId);

      if (response.status === StatusCode.OK) {
        showToast("삭제 완료");
        setTimeout(() => {
          this.moveTo("post-list");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.onClickPostDelete = async () => {
    const currentUserId = this.getCurrentUserId();
    const authorId = this.state.post.authorId;
    const postId = this.state.post.postId;

    if (authorId !== currentUserId) {
      showToast("권한이 없습니다.");
      return;
    }

    showModal({
      modalTitle: "게시글을 삭제하시겠습니까?",
      modalDescription: "삭제한 내용은 복구할 수 없습니다.",
      positiveText: "확인",
      negativeText: "취소",
      onPositive: () => {
        this.deletePost(postId);
      },
    });
  };

  this.onClickCommentModify = async (commentId, authorId) => {
    const currentUserId = this.getCurrentUserId();

    if (authorId !== currentUserId) {
      showToast("권한이 없습니다.");
      return;
    }

    const targetComment = this.state.comments.find(
      comment => comment.commentId === commentId
    );
    if (!targetComment) {
      return;
    }

    this.setState({ editingComment: targetComment });
    this.postComment.setEditMode(targetComment.content);
  };

  this.deleteComment = async commentId => {
    try {
      const postId = this.state.post.postId;
      const response = await apiManager.deleteComment({
        postId,
        commentId,
      });

      if (response.status === StatusCode.OK) {
        await this.init();
        showToast("삭제 완료");
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.onClickCommentDelete = async (commentId, authorId) => {
    const currentUserId = this.getCurrentUserId();
    if (authorId !== currentUserId) {
      showToast("권한이 없습니다.");
      return;
    }

    showModal({
      modalTitle: "댓글을 삭제하시겠습니까?",
      modalDescription: "삭제한 내용은 복구할 수 없습니다.",
      positiveText: "확인",
      negativeText: "취소",
      onPositive: () => {
        this.deleteComment(commentId);
      },
    });
  };

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

  this.getComments = async postId => {
    try {
      const response = await apiManager.getComments(postId);

      if (response.status === StatusCode.OK) {
        this.setState({ comments: response.data });
      }
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.addLike = async () => {
    try {
      const { post } = this.state;
      const response = await apiManager.addLikePost(post.postId);
      if (response.status === StatusCode.OK) {
        this.setState({
          post: { ...post, likeCount: post.likeCount + 1, likedByMe: true },
        });
      }
      showToast("좋아요 완료");
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.deleteLike = async () => {
    try {
      const { post } = this.state;
      const response = await apiManager.deleteLikePost(post.postId);
      if (response.status === StatusCode.OK) {
        this.setState({
          post: { ...post, likeCount: post.likeCount - 1, likedByMe: false },
        });
      }
      showToast("좋아요 취소 완료");
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.onClickLike = () => {
    const currentUserId = this.getCurrentUserId();

    if (!currentUserId) {
      showToast("로그인이 필요합니다.");
      return;
    }

    if (this.state.post.likedByMe) {
      this.deleteLike();
    } else {
      this.addLike();
    }
  };

  this.bindEvents = () => {
    const $postModifyButton = $(".post-modify", this.element);
    const $postDeleteButton = $(".post-delete", this.element);

    $postModifyButton.addEventListener("click", this.onClickPostModify);
    $postDeleteButton.addEventListener("click", this.onClickPostDelete);
    /*
      5) 좋아요 버튼 active / inactive => login한 유저에게만 허용
    */
  };

  this.init = async () => {
    const { query } = getCurrentPageInfo();
    const { postId } = query;

    Promise.all([await this.getPost(postId)], await this.getComments(postId));

    this.$target.appendChild(this.element);
    this.render();
    this.bindEvents();
  };
}

export default PostDetail;
