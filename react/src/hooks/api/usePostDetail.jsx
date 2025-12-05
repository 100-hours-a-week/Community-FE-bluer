import useApi from "@/hooks/api/useApi";

function usePostDetail(postId) {
  const { data: post, isLoading, isError } = useApi(`/posts/${postId}`);

  return { post, isLoading, isError };
}

export default usePostDetail;
