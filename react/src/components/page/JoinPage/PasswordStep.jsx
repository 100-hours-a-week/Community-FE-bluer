import { useJoinStep } from "@/hooks/useJoinStep";
import { getPasswordError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function PasswordStep(props) {
  const { formData, setFormData, completedSteps, setCompletedSteps, goToNextPage } = props;

  const { value, handleChange, submit, error } = useJoinStep({
    formKey: "password",
    validator: getPasswordError,
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
          비밀번호 입력
        </Text>
        <Text>사용하실 비밀번호를 입력해 주세요</Text>
        <Input
          name="password"
          type="password"
          value={value}
          onChange={handleChange}
          className=""
          variant="outlined"
          placeholder="비밀번호"
          helper={error ? { type: "error", text: error } : null}
          isPasswordVisible={true}
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

export default PasswordStep;
