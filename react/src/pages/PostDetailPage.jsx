import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useComments from "@/hooks/api/useComments";
import usePostDetail from "@/hooks/api/usePostDetail";
import useIsLoggedIn from "@/contexts/useIsLoggedIn";
import useLoggedInUser from "@/contexts/useLoggedInUser";
import { apiManager } from "@/lib/api/apiManager";
import { MAX_LENGTH } from "@/lib/constants";
import ThreadItem from "@/components/item/ThreadItem";
import CommentListContainer from "@/components/page/PostDetailPage/CommentListContainer";
import IconButton from "@/components/ui/IconButton";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Separator from "@/components/ui/Seperator";
import TextArea from "@/components/ui/TextArea";

const EDIT = "EDIT";
const CREATE = "CREATE";

function PostDetailPage() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();
  const { user } = useLoggedInUser();

  const { post, isLoading, isError } = usePostDetail(postId);
  const {
    comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    mutate,
  } = useComments(postId);

  const mode = useRef(null);
  const commentIdRef = useRef(null);
  const textareaRef = useRef(null);

  const createComment = async (content) => {
    try {
      await apiManager.postComment({ postId, content });

      textareaRef.current.value = null;
      textareaRef.current = null;
      mutate();
    } catch (error) {
      console.error(error);
    }
  };
  const updateComment = async () => {
    const content = textareaRef.current.value;
    const commentId = commentIdRef.current;

    try {
      await apiManager.updateComment({ postId, commentId, content });

      textareaRef.current.value = null;
      textareaRef.current = null;
      commentIdRef.current = null;
      mode.current = null;
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const comment = formData.get("comment");

    if (comment.length < 1) {
      return;
    }

    if (mode.current === EDIT) {
      updateComment();
    } else {
      createComment(comment);
    }
  };

  const onClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const onClickCommentModiFy = (content, commentId) => {
    mode.current = EDIT;
    textareaRef.current.value = content;
    commentIdRef.current = commentId;
  };

  if (isLoading) {
    return <ProgressFragment />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col">
        <ThreadItem
          type={"postDetail"}
          showDropdown={user?.userId === post?.authorId}
          onClickLike={() => {
            // TODO
            alert("toggle like");
          }}
          onClickModify={() => {
            alert("modify");
          }}
          onClickDelete={() => {
            alert("delete");
          }}
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
              userId={user?.userId}
            />
          )}
        </div>
      </div>
      <div className="border-t-border-grey border-t px-2 py-4">
        <form onSubmit={onSubmit} onClick={onClick}>
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
