import { useParams } from "react-router-dom";
import usePostDetail from "@/hooks/api/usePostDetail";
import PostWritePage from "@/components/page/PostWritePage";
import ProgressFragment from "@/components/ui/ProgressFragment";

function PostEditPage() {
  const { id: postId } = useParams();

  const { post, isLoading, isError } = usePostDetail(postId);

  if (isLoading) {
    return <ProgressFragment />;
  }

  if (isError) {
    return <>error</>;
  }

  return <PostWritePage mode="edit" initialData={post} />;
}

export default PostEditPage;
