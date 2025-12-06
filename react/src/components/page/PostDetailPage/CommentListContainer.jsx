import { Fragment } from "react";
import CommentList from "@/components/page/PostDetailPage/CommentList";
import Text from "@/components/ui/Text";

function CommentListContainer(props) {
  const { comments } = props;

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
