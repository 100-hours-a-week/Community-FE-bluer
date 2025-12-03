import { useEffect, useState } from "react";
import { apiManager } from "@/lib/api/apiManager";

function usePosts(cursor = null, size = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await apiManager.getPosts(cursor, size);

        setHasNext(data.hasNext);
        setNextCursor(data.nextCursor);
        setData(data.posts);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [cursor, size]);

  return { posts: data, isLoading, isError: !!error, hasNext, nextCursor };
}

export default usePosts;
