import { useCallback, useRef } from "react";
import useComments from "@/hooks/api/useComments";
import { apiManager } from "@/lib/api/apiManager";

const EDIT = "EDIT";

function usePostComments(postId) {
  const {
    comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    mutate,
  } = useComments(postId);

  const mode = useRef(null);
  const commentIdRef = useRef(null);
  const textareaRef = useRef(null);

  const createComment = useCallback(
    async (content) => {
      try {
        await apiManager.postComment({ postId, content });

        textareaRef.current.value = null;
        textareaRef.current = null;
        mutate();
      } catch (error) {
        console.error(error);
      }
    },
    [postId, mutate, textareaRef]
  );

  const updateComment = useCallback(async () => {
    const content = textareaRef.current.value;
    const commentId = commentIdRef.current;

    try {
      await apiManager.updateComment({ postId, commentId, content });

      textareaRef.current.value = null;
      textareaRef.current = null;
      commentIdRef.current = null;
      mode.current = null;
      mutate();
    } catch (error) {
      console.error(error);
    }
  }, [postId, mutate, textareaRef]);

  const onSubmitComment = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const comment = formData.get("comment");

      if (comment.length < 1) {
        return;
      }

      if (mode.current === EDIT) {
        updateComment();
      } else {
        createComment(comment);
      }
    },
    [createComment, updateComment]
  );

  const deleteComment = useCallback(
    async (commentId) => {
      try {
        await apiManager.deleteComment({ postId, commentId });
        mutate();
      } catch (error) {
        console.error(error);
      }
    },
    [mutate, postId]
  );

  const onClickCommentModiFy = (content, commentId) => {
    mode.current = EDIT;
    textareaRef.current.value = content;
    commentIdRef.current = commentId;
  };

  const onClickCommentDelete = useCallback(
    (commentId) => {
      // TODO: dialog
      if (confirm("정말 삭제하시겠습니까?")) {
        deleteComment(commentId);
      }
    },
    [deleteComment]
  );

  return {
    comments,
    isCommentsLoading,
    isCommentsError,
    onSubmitComment,
    onClickCommentModiFy,
    onClickCommentDelete,
    textareaRef,
  };
}

export default usePostComments;
