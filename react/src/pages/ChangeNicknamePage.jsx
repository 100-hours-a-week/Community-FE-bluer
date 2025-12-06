import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import useRefreshUser from "@/contexts/useRefreshUser";
import { apiManager } from "@/lib/api/apiManager";
import { MAX_LENGTH } from "@/lib/constants";
import { checkNicknameDuplication } from "@/service/userService";
import { getNicknameError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function ChangeNicknamePage() {
  const navigate = useNavigate();
  const { refreshUserInfo } = useRefreshUser();
  const toast = useToast();
  const [nicknameError, setNicknameError] = useState(null);

  const validateNicknameForm = async (nickname) => {
    setNicknameError(null);

    const nicknameError = getNicknameError(nickname);
    if (nicknameError) {
      setNicknameError(nicknameError.message);
      return;
    }
    try {
      const result = await checkNicknameDuplication(nickname);

      if (result?.message) {
        setNicknameError(result.message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeNickname = async (nickname) => {
    try {
      await apiManager.updateProfile({
        nickname,
      });

      refreshUserInfo();
      toast("변경 완료");
      navigate("/user/info");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nickname = formData.get("nickname");

    try {
      await validateNicknameForm(nickname);
      await changeNickname(nickname);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-6">
        <Text variant="title" size="xl">
          닉네임 변경
        </Text>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <Input
            name="nickname"
            type="text"
            defaultValue={""}
            variant="outlined"
            placeholder={`닉네임 입력(최대 ${MAX_LENGTH.NICKNAME}자)`}
            maxlength={MAX_LENGTH.NICKNAME}
            helper={nicknameError ? { type: "error", text: nicknameError } : null}
          />

          <div />
          <Button variant="submit" size="xs">
            <span className="mx-auto">닉네임 변경하기</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangeNicknamePage;
