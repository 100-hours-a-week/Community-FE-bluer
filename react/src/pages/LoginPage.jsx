import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

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
        <Button size={"xl"} className="center flex h-[34px] justify-center">
          <Text className="text-base-white" size={"md"}>
            로그인
          </Text>
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
