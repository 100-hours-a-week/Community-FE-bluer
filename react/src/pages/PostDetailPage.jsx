import { useParams } from "react-router-dom";
import usePostDetail from "@/hooks/api/usePostDetail";
import PostItem from "@/components/item/PostItem";
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

  return <PostItem {...post} />;
}

export default PostDetailPage;
