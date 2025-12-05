import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EmailStep from "@/components/page/JoinPage/EmailStep";
import NicknameStep from "@/components/page/JoinPage/NicknameStep";
import PasswordStep from "@/components/page/JoinPage/PasswordStep";

function JoinPage() {
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

  return (
    <Routes>
      <Route
        path="/email"
        element={
          <EmailStep
            formData={formData}
            setFormData={setFormData}
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            goToNextPage={() => {
              navigate("/join/nickname");
            }}
          />
        }
      />
      <Route
        path="/nickname"
        element={
          <NicknameStep
            formData={formData}
            setFormData={setFormData}
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            goToNextPage={() => {
              navigate("/join/password");
            }}
          />
        }
      />
      <Route
        path="/password"
        element={
          <PasswordStep
            formData={formData}
            setFormData={setFormData}
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            goToNextPage={() => {
              navigate("/join/complete");
            }}
          />
        }
      />
      <Route path="/complete" element={<div>complete</div>} />
    </Routes>
  );
}

export default JoinPage;
