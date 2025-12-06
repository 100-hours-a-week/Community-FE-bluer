import { useState } from "react";
import useFileInput from "@/hooks/useFileInput";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import TextArea from "@/components/ui/TextArea";

function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const { inputRef, onClickFileInput, onChange } = useFileInput({
    onFileChangeSuccess: (file) => {
      setFileName(file.name);
    },
    onFileChangeReject: () => {
      setFileName("");
    },
  });
  return (
    <div className="h-full p-3">
      <form className="flex h-full flex-col gap-y-10">
        <div className="flex flex-col gap-y-3">
          <Text variant="title" size="xl">
            제목
          </Text>
          <Input
            name={"title"}
            variant="outlined"
            placeholder="제목을 입력해 주세요"
            maxLength={26}
            endAdornment={
              <Text variant="caption" hierarchy={"secondary"}>
                {title.length}/26
              </Text>
            }
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="flex h-full flex-col gap-y-6">
          <div className="flex h-full flex-col gap-y-3">
            <Text variant="title" size="xl">
              내용
            </Text>
            <TextArea
              className="h-full"
              wrapperStyle={" h-full"}
              name="content"
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <div className="flex h-1/3 flex-col justify-between">
            <div className="flex flex-col gap-y-3">
              <Text variant="title" size="xl">
                이미지
              </Text>
              {/* <input type="file" accept="image/png, image/jpeg" /> */}
              <div>
                <Button
                  type="button"
                  variant="secondary"
                  className="border-button-secondary-border h-9"
                  onClick={onClickFileInput}
                >
                  <Text className="mx-auto">이미지 첨부하기</Text>
                </Button>
                <Text>{fileName}</Text>
              </div>
              <div className="hidden">
                <Input
                  onChange={onChange}
                  ref={inputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>
            <div className="flex">
              <Button
                className="w-full"
                variant="submit"
                onClick={() => {
                  // submit();
                }}
              >
                <span className="mx-auto">작성</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostCreatePage;
