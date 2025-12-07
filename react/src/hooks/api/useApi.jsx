import { useCallback, useEffect, useState } from "react";
import { restClient } from "@/lib/api/restClient";

function useApi(requestUrl, params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await restClient.get(requestUrl, params);

      setData(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [params, requestUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError: !!error, mutate: fetchData };
}

export default useApi;
