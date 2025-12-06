import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiManager } from "@/lib/api/apiManager";
import { PasswordErrorMessage } from "@/lib/constants";
import { getPasswordError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [originPasswordError, setOriginPasswordError] = useState(null);
  const [newPasswordError, setNewpasswordError] = useState(null);
  const [newPasswordConfirmError, setNewpasswordConfirmError] = useState(null);

  const validatePasswordForm = async (originPassword, newPassword, newPasswordConfirm) => {
    setOriginPasswordError(null);
    setNewpasswordError(null);
    setNewpasswordConfirmError(null);

    /*
      1. 기존 비밀번호 validation 규칙 확인
      2. 기존 비밀번호가 실제와 일치하는지 확인
      3. newPassword가 validation 규칙에 적용되는지 확인
      4. newPassword와 newPasswordConfirm과 같은지 확인
    */

    const originPasswordError = getPasswordError(originPassword);
    if (originPasswordError) {
      setOriginPasswordError(originPasswordError.message);
      return;
    }
    try {
      const { data } = await apiManager.getIsPasswordMatched({ password: originPassword });
      const { match } = data;

      if (!match) {
        setOriginPasswordError(PasswordErrorMessage.NOT_MATCH_ORIGIN_PASSWORD);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const newPasswordError = getPasswordError(newPassword);

    if (newPasswordError) {
      setNewpasswordError(newPasswordError.message);
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setNewpasswordConfirmError(PasswordErrorMessage.NOT_MATCH_CONFIRM);
      return;
    }
  };

  const changePassword = async (newPassword) => {
    try {
      await apiManager.updatePassword({
        password: newPassword,
      });

      // TODO: success toast
      alert("성공");
      navigate("/user/info");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const originPassword = formData.get("originPassword");
    const newPassword = formData.get("newPassword");
    const newPasswordConfirm = formData.get("newPasswordConfirm");

    validatePasswordForm(originPassword, newPassword, newPasswordConfirm);
    changePassword(newPassword);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-6">
        <Text variant="title" size="xl">
          비밀번호 변경
        </Text>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <Input
            name="originPassword"
            type="password"
            isPasswordVisible={true}
            defaultValue={""}
            variant="outlined"
            placeholder="기존 비밀번호"
            helper={originPasswordError ? { type: "error", text: originPasswordError } : null}
          />
          <Input
            name="newPassword"
            type="password"
            isPasswordVisible={true}
            defaultValue={""}
            variant="outlined"
            placeholder="새 비밀번호"
            helper={newPasswordError ? { type: "error", text: newPasswordError } : null}
          />
          <Input
            name="newPasswordConfirm"
            type="password"
            isPasswordVisible={true}
            defaultValue={""}
            variant="outlined"
            placeholder="새 비밀번호 확인"
            helper={
              newPasswordConfirmError ? { type: "error", text: newPasswordConfirmError } : null
            }
          />
          <div />
          <Button variant="submit" size="xs">
            <span className="mx-auto">비밀번호 변경하기</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
