import { useNavigate } from "react-router-dom";
import useClearUserContext from "@/contexts/useClearUserContext";
import useRefreshUser from "@/contexts/useRefreshUser";
import { apiManager } from "@/lib/api/apiManager";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function WithdrawalPage() {
  const navigate = useNavigate();
  const { clearUserInfo } = useClearUserContext();
  const { refreshUserInfo } = useRefreshUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const reason = formData.get("reason");
    console.log(reason);
    // TODO: dialog
    const response = confirm("정말 탈퇴하시겠습니까?");

    if (response) {
      try {
        apiManager.withdrawProfile();

        clearUserInfo();
        refreshUserInfo();
        navigate("/");
      } catch (error) {
        // TODO: error
        console.error(error);
      }
    }
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-6">
        <Text variant="title" size="xl">
          회원탈퇴
        </Text>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <Text>탈퇴 사유 입력</Text>
          <Input name="reason" type="text" defaultValue={""} variant="outlined" />

          <div />
          <Button variant="submit" size="xs">
            <span className="mx-auto">탈퇴하기</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawalPage;
