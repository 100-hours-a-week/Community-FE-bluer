import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiManager } from "@/lib/api/apiManager";
import ProgressFragment from "@/components/ui/ProgressFragment";

function CompleteStep(props) {
  const { formData } = props;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const signup = useCallback(async () => {
    try {
      setIsLoading(true);

      await apiManager.signUp({ ...formData });
      // TODO: toast
      alert("성공");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error);
      // TODO: toast
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [formData, navigate]);

  useEffect(() => {
    signup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <ProgressFragment />;
  }

  if (error) {
    return (
      // TODO: development fail case
      <button onClick={signup}>다시 시도하기</button>
    );
  }
  return <></>;
}

export default CompleteStep;
