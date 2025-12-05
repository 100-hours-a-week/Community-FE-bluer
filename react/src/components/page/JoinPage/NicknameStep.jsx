import { useState } from "react";
import { checkNicknameDuplication } from "@/service/userService";
import { getNicknameError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function NicknameStep(props) {
  const { formData, setFormData, completedSteps, setCompletedSteps, goToNextPage } = props;
  const [nickname, setNickname] = useState(formData.nickname);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setNickname(event.target.value);

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const onClick = async () => {
    const nicknameError = getNicknameError(nickname);

    if (nicknameError) {
      const { message } = nicknameError;

      setErrorMessage(message);
      return;
    }

    const result = await checkNicknameDuplication(nickname);

    if (result?.type && result?.message) {
      setErrorMessage(result.message);
      return;
    }
    setFormData({ ...formData, nickname });
    setCompletedSteps({ ...completedSteps, email: true });
    goToNextPage();
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-2">
        <Text variant="title" size="xl">
          닉네임 입력
        </Text>
        <Text>사용하실 닉네임을 입력해 주세요</Text>
        <Input
          type="text"
          value={nickname}
          onChange={handleChange}
          className=""
          variant="outlined"
          placeholder="닉네임"
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

export default NicknameStep;
