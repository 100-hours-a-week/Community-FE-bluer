import useApi from "@/hooks/api/useApi";

function useComments(postId) {
  const { data: comments, isLoading, isError } = useApi(`/post/${postId}/comments`);

  return { comments, isLoading, isError };
}

export default useComments;
