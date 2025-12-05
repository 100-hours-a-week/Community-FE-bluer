import { Fragment } from "react";
import useComments from "@/hooks/api/useComments";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Separator from "@/components/ui/Seperator";
import CommentList from "./CommentList";

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

  if (comments?.length === 0) {
    return <></>;
  }

  return (
    <Fragment>
      <Separator />
      <CommentList comments={comments} />
    </Fragment>
  );
}

export default CommentListContainer;
