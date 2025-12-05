import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Separator from "@/components/ui/Seperator";
import Text from "@/components/ui/Text";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-5">
      <Text variant="title" size="lg" align="center">
        로그인
      </Text>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="border-b-blue flex w-full max-w-[375px] flex-col gap-y-3"
      >
        {/* TODO: if error, set variant error  */}
        <Input
          name="email"
          placeholder="이메일 주소"
          // error
          // helper={{
          //   type: "error",
          //   text: "error message",
          // }}
        />
        <Input name="password" placeholder="비밀번호" />
        <Button type="submit" size={"xl"} className="center flex h-[34px] justify-center">
          <Text className="text-base-white" size={"md"}>
            로그인
          </Text>
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
