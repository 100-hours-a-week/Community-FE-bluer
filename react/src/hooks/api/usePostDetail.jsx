import useApi from "@/hooks/api/useApi";

function usePostDetail(postId) {
  const { data: post, isLoading, isError, mutate } = useApi(`/posts/${postId}`);

  return { post, isLoading, isError, mutate };
}

export default usePostDetail;
