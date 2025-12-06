import ThreadItem from "@/components/item/ThreadItem";

function CommentList(props) {
  const { comments, onModify, userId } = props;

  return (
    <>
      {comments?.map((comment) => {
        const { nickname, profileImageUrl } = comment.author;

        return (
          <ThreadItem
            key={comment.commentId}
            type="comment"
            authorName={nickname}
            authorProfileImageUrl={profileImageUrl}
            onClickModify={onModify}
            showDropdown={comment.author.id === userId}
            threadId={comment.commentId}
            {...comment}
          />
        );
      })}
    </>
  );
}

export default CommentList;
