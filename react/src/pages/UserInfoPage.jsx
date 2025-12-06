import { Link, useLocation, useNavigate } from "react-router-dom";
import useFileInput from "@/hooks/useFileInput";
import useClearUserContext from "@/contexts/useClearUserContext";
import useLoggedInUser from "@/contexts/useLoggedInUser";
import useRefreshUser from "@/contexts/useRefreshUser";
import { apiManager } from "@/lib/api/apiManager";
import { uploadToImageBucket } from "@/lib/extenal/imageBucket";
import UserInfoPageMenuItem from "@/components/page/UserInfoPage/UserInfoPageItem";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function UserInfoPage() {
  const { user } = useLoggedInUser();
  const { clearUserInfo } = useClearUserContext();
  const { refreshUserInfo } = useRefreshUser();

  const navigate = useNavigate();
  const location = useLocation();

  const changeProfileImage = async (file) => {
    // TODO: toast or error

    let uploadedImageUrl;
    try {
      uploadedImageUrl = await uploadToImageBucket(file);
    } catch (error) {
      console.error(error);
    }

    try {
      await apiManager.updateProfile({ profileImageUrl: uploadedImageUrl });

      refreshUserInfo();
    } catch (error) {
      console.error(error);
    }
  };

  const { inputRef, onClickFileInput, onChange } = useFileInput({
    onFileChangeSuccess: changeProfileImage,
  });

  const logout = async () => {
    try {
      await apiManager.signOut();

      clearUserInfo();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between p-3">
      <div>
        <div className="mb-3 flex items-center gap-x-2">
          <Avatar size="xl" imgUrl={user.profileImageUrl} />
          <div className="flex flex-col gap-0.5">
            <Text variant="title">{user.nickname}</Text>
            <Text hierarchy="secondary">Email: {`${user.email}`}</Text>
          </div>
        </div>
        <div className="flex w-full gap-x-2 pt-1 pb-3">
          <Button
            variant="secondary"
            className="border-button-secondary-border h-9 w-full"
            onClick={onClickFileInput}
          >
            <Text className="mx-auto">프로필 이미지 변경</Text>
          </Button>
          <div className="hidden">
            <Input onChange={onChange} ref={inputRef} type="file" accept="image/png, image/jpeg" />
          </div>
          <Button
            as={Link}
            to={`${location.pathname}/change-nickname`}
            variant="secondary"
            className="border-button-secondary-border h-9 w-full"
          >
            <Text className="mx-auto">닉네임 변경</Text>
          </Button>
        </div>
        <ul>
          <li>
            <UserInfoPageMenuItem
              to={`${location.pathname}/change-password`}
              menuName="비밀번호 변경"
            />
          </li>
          <li>
            <UserInfoPageMenuItem to={`${location.pathname}/withdrawal`} menuName="회원탈퇴" />
          </li>
        </ul>
      </div>
      <Text size="sm" className="underline hover:cursor-pointer" onClick={logout}>
        로그아웃
      </Text>
    </div>
  );
}

export default UserInfoPage;
