import { Fragment } from "react";
import useComments from "@/hooks/api/useComments";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Separator from "@/components/ui/Seperator";
import CommentList from "./CommentList";
import Text from "@/components/ui/Text";

function CommentListContainer(props) {
  const { postId } = props;
  const { comments, isLoading, isError } = useComments(postId);

  if (isLoading) {
    return <ProgressFragment />;
  }

  // TODO: error
  if (isError) {
    return <>error</>;
  }

  return (
    <Fragment>
      <div className="p-3">
        <Text variant="title">댓글 {comments?.length}</Text>
      </div>
      {comments?.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <div className="flex flex-col items-center gap-y-1.5 py-15">
          <Text variant="caption">첫번째로 댓글을 남겨보세요.</Text>
        </div>
      )}
    </Fragment>
  );
}

export default CommentListContainer;
