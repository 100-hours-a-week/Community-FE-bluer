import { useState } from "react";

import { getEmailError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function EmailStep(props) {
  const { formData, setFormData, completedSteps, setCompletedSteps } = props;
  const [email, setEmail] = useState(formData.email);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const onClick = () => {
    const emailError = getEmailError(email);

    if (emailError) {
      const { message } = emailError;

      setErrorMessage(message);
      return;
    }
    setFormData({ ...formData, email });
    setCompletedSteps({ ...completedSteps, email: true });
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-2">
        <Text variant="title" size="xl">
          이메일 주소 입력
        </Text>
        <Text>사용하실 이메일을 입력해 주세요</Text>
        <Input
          type="email"
          value={email}
          onChange={handleChange}
          className=""
          variant="outlined"
          placeholder="이메일 주소"
          helper={errorMessage ? { type: "error", text: errorMessage } : null}
        />
        <div />
        <Button variant="submit" size="xs" onClick={onClick}>
          <span className="mx-auto">다음</span>
        </Button>
      </div>
    </div>
  );
}

export default EmailStep;
