import { useEffect, useState } from "react";
import { restClient } from "@/lib/api/restClient";

function useApi(requestUrl, params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await restClient.get(requestUrl, params);

        setData({ ...data });
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params, requestUrl]);

  return { data, isLoading, isError: !!error };
}

export default useApi;
