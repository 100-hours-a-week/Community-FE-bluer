import { useNavigate, useParams } from "react-router-dom";
import useComments from "@/hooks/api/useComments";
import usePostDetail from "@/hooks/api/usePostDetail";
import useIsLoggedIn from "@/contexts/useIsLoggedIn";
import { apiManager } from "@/lib/api/apiManager";
import { MAX_LENGTH } from "@/lib/constants";
import ThreadItem from "@/components/item/ThreadItem";
import CommentListContainer from "@/components/page/PostDetailPage/CommentListContainer";
import IconButton from "@/components/ui/IconButton";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Separator from "@/components/ui/Seperator";
import Text from "@/components/ui/Text";
import TextArea from "@/components/ui/TextArea";

function PostDetailPage() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();
  const { post, isLoading, isError } = usePostDetail(postId);
  const {
    comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    mutate,
  } = useComments(postId);

  const postComment = async (content) => {
    try {
      await apiManager.postComment({ postId, content });

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

    postComment(comment);
  };

  const onClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
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
          onClickLike={() => {
            // TODO
            alert("toggle like");
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
            <CommentListContainer postId={postId} comments={comments} />
          )}
        </div>
      </div>
      <div className="border-t-border-grey border-t px-2 py-4">
        <form onSubmit={onSubmit} onClick={onClick}>
          <TextArea
            name="comment"
            variant="outlined"
            multiline={true}
            placeholder="댓글을 적어주세요"
            maxLength={MAX_LENGTH.COMMENT}
            endAdornment={
              <IconButton type="submit">
                <Text variant="title">등록</Text>
              </IconButton>
            }
          />
        </form>
      </div>
    </div>
  );
}

export default PostDetailPage;
