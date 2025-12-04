import { useParams } from "react-router-dom";
import usePostDetail from "@/hooks/api/usePostDetail";
import ThreadItem from "@/components/item/ThreadItem";
import CommentListContainer from "@/components/page/PostDetailPage/CommentListContainer";
import ProgressFragment from "@/components/ui/ProgressFragment";

function PostDetailPage() {
  const { id: postId } = useParams();

  const { post, isLoading, isError } = usePostDetail(postId);

  if (isLoading) {
    return <ProgressFragment />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-y-10">
      <ThreadItem
        type={"postDetail"}
        onClickLike={() => {
          alert("toggle like");
        }}
        onClickComment={() => {
          alert("comment");
        }}
        {...post}
      />
      <div>
        <CommentListContainer postId={postId} />
      </div>
    </div>
  );
}

export default PostDetailPage;
