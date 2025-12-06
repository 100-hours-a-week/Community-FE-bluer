import PostItem from "@/components/item/PostItem";

function CommentList(props) {
  const { comments, onModify, onDelete, userId } = props;

  return (
    <>
      {comments?.map((comment) => {
        const { nickname, profileImageUrl } = comment.author;

        return (
          <PostItem
            key={comment.commentId}
            type="comment"
            authorName={nickname}
            authorProfileImageUrl={profileImageUrl}
            onClickModify={onModify}
            onClickDelete={onDelete}
            showDropdown={comment.author.id === userId}
            itemId={comment.commentId}
            {...comment}
          />
        );
      })}
    </>
  );
}

export default CommentList;
