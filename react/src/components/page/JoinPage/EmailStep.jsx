import { useJoinStep } from "@/hooks/useJoinStep";
import { checkEmailDuplication } from "@/service/userService";
import { getEmailError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function EmailStep(props) {
  const { formData, setFormData, completedSteps, setCompletedSteps, goToNextPage } = props;

  const { value, handleChange, submit, error } = useJoinStep({
    formKey: "email",
    validator: getEmailError,
    checker: checkEmailDuplication,
    formData,
    setFormData,
    completedSteps,
    setCompletedSteps,
    onSuccess: goToNextPage,
  });

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-2">
        <Text variant="title" size="xl">
          이메일 주소 입력
        </Text>
        <Text>사용하실 이메일을 입력해 주세요</Text>
        <Input
          type="email"
          value={value}
          onChange={handleChange}
          className=""
          variant="outlined"
          placeholder="이메일 주소"
          helper={error ? { type: "error", text: error } : null}
        />
        <div />
        <Button
          variant="submit"
          size="xs"
          onClick={() => {
            submit();
          }}
        >
          <span className="mx-auto">다음</span>
        </Button>
      </div>
    </div>
  );
}

export default EmailStep;
