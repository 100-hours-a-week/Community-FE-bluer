import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import { apiManager } from "@/lib/api/apiManager";
import ProgressFragment from "@/components/ui/ProgressFragment";

function CompleteStep(props) {
  const { formData } = props;

  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const signup = useCallback(async () => {
    try {
      setIsLoading(true);

      await apiManager.signUp({ ...formData });
      toast("가입 완료");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error);
      toast("에러 발생");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [formData, navigate, toast]);

  useEffect(() => {
    signup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <ProgressFragment />;
  }

  if (error) {
    return <button onClick={signup}>다시 시도하기</button>;
  }
  return <></>;
}

export default CompleteStep;
