import { useState } from "react";
import { Link } from "react-router-dom";
import { apiManager } from "@/lib/api/apiManager";
import { LoginErrorMessage } from "@/lib/constants";
import { getEmailError, getPasswordError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProgressFragment from "@/components/ui/ProgressFragment";
import Text from "@/components/ui/Text";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: null, password: null });

  const onSignIn = async (event) => {
    event.preventDefault();
    setError({ email: null, password: null });

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const emailError = getEmailError(email);
    if (emailError) {
      setError((prevState) => ({ ...prevState, email: emailError.message }));
      return;
    }

    const passwordError = getPasswordError(password);
    if (passwordError) {
      setError((prevState) => ({ ...prevState, password: passwordError.message }));
      return;
    }

    setIsLoading(true);
    try {
      await apiManager.login({ email, password });
      alert("성공");
      /*
        TODO: set cookie, handling logic
        redirect post-list page
      */
    } catch (error) {
      console.error(error);
      setError({ password: LoginErrorMessage.LOGIN_FAILED });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-5">
      <Text variant="title" size="lg" align="center">
        로그인
      </Text>
      <form onSubmit={onSignIn} className="flex w-full max-w-[375px] flex-col gap-y-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일 주소"
          helper={
            error.email
              ? {
                  type: "error",
                  text: error.email,
                }
              : {}
          }
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          isPasswordVisible={true}
          helper={
            error.password
              ? {
                  type: "error",
                  text: error.password,
                }
              : {}
          }
        />
        <Button
          type="submit"
          size={"xl"}
          className="center flex h-[34px] justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ProgressFragment circleColor={"white"} />
          ) : (
            <Text className="text-base-white" size={"md"}>
              로그인
            </Text>
          )}
        </Button>

        <div className="flex w-full justify-center">
          <Link to={"/join"}>
            <Text className="" size={"md"}>
              회원가입
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
