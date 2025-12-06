import useApi from "@/hooks/api/useApi";

function useComments(postId) {
  const { data: comments, isLoading, isError, mutate } = useApi(`/post/${postId}/comments`);

  return { comments, isLoading, isError, mutate };
}

export default useComments;
