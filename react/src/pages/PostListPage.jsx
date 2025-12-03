import usePosts from "@/hooks/api/usePosts";
import PostItem from "@/components/item/Posttem";
import List from "@/components/ui/List";

function PostListPage() {
  const { posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return <>loading</>;
  }

  if (isError) {
    return <>error</>;
  }

  return (
    <>
      <List direction="column">
        {posts?.map((post) => {
          return <PostItem key={post.postId} imgUrl={"/logo.png"} />;
        })}
      </List>
    </>
  );
}

export default PostListPage;
