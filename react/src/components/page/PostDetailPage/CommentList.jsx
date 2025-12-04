import ThreadItem from "@/components/item/ThreadItem";

function CommentList(props) {
  const { comments } = props;

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
            {...comment}
          />
        );
      })}
    </>
  );
}

export default CommentList;
