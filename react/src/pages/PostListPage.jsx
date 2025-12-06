import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePosts from "@/hooks/api/usePosts";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useToggleLike from "@/hooks/useToggleLike";
import { useToast } from "@/contexts/ToastContext";
import PostItem from "@/components/item/PostItem";
import List from "@/components/ui/List";
import ListItem from "@/components/ui/ListItem";
import ProgressFragment from "@/components/ui/ProgressFragment";

function PostListPage() {
  const navigate = useNavigate();
  const { posts, isLoading, isError, hasNext, fetchNextPage, mutate } = usePosts();
  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });

  const { toggleLike } = useToggleLike(mutate);

  useEffect(() => {
    if (!isIntersecting || !hasNext || isLoading) {
      return;
    }
    fetchNextPage();
  }, [isIntersecting, hasNext, fetchNextPage, isLoading]);

  if (posts.length === 0 && isLoading) {
    return <ProgressFragment />;
  }

  if (isError) {
    return <>error</>;
  }

  return (
    <>
      <List direction="column">
        {posts?.map((post) => {
          return (
            <ListItem
              key={post.postId}
              onClick={() => {
                navigate(`/posts/${post.postId}`);
              }}
            >
              <PostItem
                {...post}
                type="post"
                onClickLike={() => {
                  toggleLike(post.postId, post.likedByMe);
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <div className="h-5" ref={targetRef}></div>
    </>
  );
}

export default PostListPage;
