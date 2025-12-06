import { useJoinStep } from "@/hooks/useJoinStep";
import { MAX_LENGTH } from "@/lib/constants";
import { getNicknameError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

function NicknameStep(props) {
  const { formData, setFormData, completedSteps, setCompletedSteps, goToNextPage } = props;

  const { value, handleChange, submit, error } = useJoinStep({
    formKey: "nickname",
    validator: getNicknameError,
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
          닉네임 입력
        </Text>
        <Text>사용하실 닉네임을 입력해 주세요</Text>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          className=""
          variant="outlined"
          helper={error ? { type: "error", text: error } : null}
          placeholder={`닉네임 (최대 ${MAX_LENGTH.NICKNAME}자)`}
          maxLength={MAX_LENGTH.NICKNAME}
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

export default NicknameStep;
