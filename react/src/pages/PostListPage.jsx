import { useEffect } from "react";
import usePosts from "@/hooks/api/usePosts";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import PostItem from "@/components/item/Posttem";
import List from "@/components/ui/List";

function PostListPage() {
  const { posts, isLoading, isError, hasNext, fetchNextPage } = usePosts();
  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (!isIntersecting || !hasNext || isLoading) {
      return;
    }
    fetchNextPage();
  }, [isIntersecting, hasNext, fetchNextPage, isLoading]);

  if (posts.length === 0 && isLoading) {
    return <>loading</>;
  }

  if (isError) {
    return <>error</>;
  }

  return (
    <>
      <List direction="column">
        {posts?.map((post) => {
          return <PostItem key={post.postId} {...post} />;
        })}
      </List>
      <div className="h-5" ref={targetRef}></div>
    </>
  );
}

export default PostListPage;
