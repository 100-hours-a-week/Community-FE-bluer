import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EmailStep from "@/components/page/JoinPage/EmailStep";
import NicknameStep from "@/components/page/JoinPage/NicknameStep";
import PasswordStep from "@/components/page/JoinPage/PasswordStep";

const steps = ["email", "nickname", "password", "complete"];

const stepComponents = {
  email: EmailStep,
  nickname: NicknameStep,
  password: PasswordStep,
  complete: () => <div>complete</div>,
};

function JoinPage() {
  const { step } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const [completedSteps, setCompletedSteps] = useState({
    email: false,
    nickname: false,
    password: false,
  });

  const current = useMemo(() => steps.indexOf(step), [step]);
  const firstIncomplete = useMemo(() => steps.find((s) => !completedSteps[s]), [completedSteps]);
  const firstIncompleteIndex = useMemo(() => steps.indexOf(firstIncomplete), [firstIncomplete]);

  const goToNextPage = useCallback(() => {
    navigate(`/join/${steps[current + 1]}`);
  }, [navigate, current]);

  const StepComponent = stepComponents[step];

  if (!steps.includes(step)) {
    return <Navigate to="/join/email" replace />;
  }
  if (current > firstIncompleteIndex) {
    return <Navigate to={`/join/${firstIncomplete}`} replace />;
  }

  return (
    <StepComponent
      formData={formData}
      setFormData={setFormData}
      completedSteps={completedSteps}
      setCompletedSteps={setCompletedSteps}
      goToNextPage={goToNextPage}
    />
  );
}

export default JoinPage;
