import { useParams } from "react-router-dom";

function PostEditPage() {
  const { id: postId } = useParams();

  console.log(postId);
  return <>PostEditPage</>;
}

export default PostEditPage;
