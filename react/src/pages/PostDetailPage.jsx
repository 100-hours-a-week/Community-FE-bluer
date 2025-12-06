import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePostDetail from "@/hooks/api/usePostDetail";
import usePostComments from "@/hooks/usePostComments";
import useIsLoggedIn from "@/contexts/useIsLoggedIn";
import useLoggedInUser from "@/contexts/useLoggedInUser";
import { apiManager } from "@/lib/api/apiManager";
import { MAX_LENGTH } from "@/lib/constants";
import PostItem from "@/components/item/PostItem";
import CommentListContainer from "@/components/page/PostDetailPage/CommentListContainer";
import IconButton from "@/components/ui/IconButton";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Separator from "@/components/ui/Seperator";
import TextArea from "@/components/ui/TextArea";
import { useToast } from "@/contexts/ToastContext";
import useToggleLike from "@/hooks/useToggleLike";

function PostDetailPage() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();
  const { user } = useLoggedInUser();

  const { post, isLoading, isError, mutate } = usePostDetail(postId);
  const {
    comments,
    isCommentsLoading,
    isCommentsError,
    onSubmitComment,
    onClickCommentModiFy,
    onClickCommentDelete,
    textareaRef,
  } = usePostComments(postId);

  const { toggleLike } = useToggleLike(mutate);

  const onDeletePost = async () => {
    const response = confirm("정말 삭제하시겠습니끼?");
    if (!response) {
      return;
    }

    try {
      await apiManager.deletePost(postId);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const onFormClick = useCallback(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return <ProgressFragment />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col">
        <PostItem
          type={"postDetail"}
          showDropdown={user?.userId === post?.authorId}
          onClickLike={() => {
            toggleLike(postId, post.likedByMe);
          }}
          onClickModify={() => {
            navigate(`/posts/${postId}/edit`);
          }}
          onClickDelete={onDeletePost}
          {...post}
        />
        <Separator className={"h-2.5"} />
        <div>
          {isCommentsLoading ? (
            <ProgressFragment />
          ) : isCommentsError ? (
            <></>
          ) : (
            <CommentListContainer
              comments={comments}
              onModify={onClickCommentModiFy}
              onDelete={onClickCommentDelete}
              userId={user?.userId}
            />
          )}
        </div>
      </div>
      <div className="border-t-border-grey border-t px-2 py-4">
        <form onSubmit={onSubmitComment} onClick={onFormClick}>
          <TextArea
            ref={textareaRef}
            name="comment"
            variant="outlined"
            placeholder="댓글을 적어주세요"
            maxLength={MAX_LENGTH.COMMENT}
            endAdornment={
              <IconButton type="submit">
                <FontAwesomeIcon icon={faCircleArrowUp} />
              </IconButton>
            }
          />
        </form>
      </div>
    </div>
  );
}

export default PostDetailPage;
