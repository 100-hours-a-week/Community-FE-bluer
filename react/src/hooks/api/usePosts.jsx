import { useCallback, useEffect, useState } from "react";
import { apiManager } from "@/lib/api/apiManager";

const PER_PAGE = 5;
function usePosts(initialCursor = null, size = PER_PAGE) {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [nextCursor, setNextCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNextPage = useCallback(async () => {
    if (!hasNext || isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const { data } = await apiManager.getPosts(cursor, size);

      setPosts((prevPosts) => {
        return [...prevPosts, ...data.posts];
      });
      setHasNext(data.hasNext);
      setNextCursor(data.nextCursor);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasNext, isLoading, size]);

  useEffect(() => {
    fetchNextPage();
  }, []);

  return { posts, isLoading, isError: !!error, hasNext, nextCursor, fetchNextPage };
}

export default usePosts;
