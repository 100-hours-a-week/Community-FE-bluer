import { Navigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import useIsLoggedIn from "@/contexts/useIsLoggedIn";
import { apiManager } from "@/lib/api/apiManager";

function useToggleLike(onSuccess) {
  const isLoggedIn = useIsLoggedIn();
  const toast = useToast();

  const toggleLike = async (postId, likedByMe) => {
    if (!isLoggedIn) {
      Navigate("/login");
      return;
    }
    try {
      if (likedByMe) {
        await apiManager.deleteLikePost(postId);
      } else {
        await apiManager.addLikePost(postId);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast("에러 발생");
      console.error(error);
    }
  };

  return { toggleLike };
}

export default useToggleLike;
