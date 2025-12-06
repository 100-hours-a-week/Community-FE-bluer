import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFileInput from "@/hooks/useFileInput";
import { apiManager } from "@/lib/api/apiManager";
import { uploadToImageBucket } from "@/lib/extenal/imageBucket";
import { getPostContentError, getPostTitleError } from "@/utils/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import TextArea from "@/components/ui/TextArea";

async function urlToFile(imageUrl, fileName = "origin") {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const ext = blob.type.split("/")[1];
  return new File([blob], `${fileName}.${ext}`, { type: blob.type });
}

function PostWritePage(props) {
  const { mode, initialData } = props;

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [file, setFile] = useState(null);
  const [originImageUrl, setOriginImageUrl] = useState(null);

  const { inputRef, onClickFileInput, onChange } = useFileInput({
    onFileChangeSuccess: (file) => {
      setFile(file);
    },
    onFileChangeReject: () => {
      setFile(null);
    },
  });

  const validateForm = useCallback(
    (title, content) => {
      setTitleError(null);
      setContentError(null);

      const titleError = getPostTitleError(title);
      if (titleError) throw { field: "title", message: titleError.message };

      const contentError = getPostContentError(content);
      if (contentError) throw { field: "content", message: contentError.message };
    },
    [setTitleError, setContentError]
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const content = formData.get("content");

      try {
        validateForm(title, content);
      } catch (error) {
        if (error.field === "title") setTitleError(error.message);
        if (error.field === "content") setContentError(error.message);
        return;
      }

      let uploadedImageUrl = originImageUrl;

      if (file && file.name !== "origin.jpg") {
        try {
          uploadedImageUrl = await uploadToImageBucket(file);
        } catch (error) {
          console.error(error);
        }
      }

      try {
        if (mode === "create") {
          await apiManager.addPost({ title, content, imageUrl: uploadedImageUrl });
        } else {
          await apiManager.updatePost(initialData.id, {
            title,
            content,
            imageUrl: uploadedImageUrl,
          });
        }
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [file, title, validateForm, navigate, mode, originImageUrl, initialData]
  );

  useEffect(() => {
    if (mode === "edit" && initialData) {
      queueMicrotask(() => {
        setTitle(initialData.title ?? "");
        setOriginImageUrl(initialData.imageUrl || null);
      });

      if (initialData.imageUrl) {
        urlToFile(initialData.imageUrl).then((file) => setFile(file));
      }
    }
  }, [mode, initialData]);

  return (
    <div className="h-full p-3">
      <form className="flex h-full flex-col gap-y-10" onSubmit={onSubmit}>
        <div className="flex flex-col gap-y-3">
          <Text variant="title" size="xl">
            제목
          </Text>
          <Input
            name="title"
            variant="outlined"
            placeholder="제목을 입력해 주세요"
            maxLength={26}
            endAdornment={
              <Text variant="caption" hierarchy={"secondary"}>
                {title.length}/26
              </Text>
            }
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            helper={titleError ? { type: "error", text: titleError } : null}
          />
        </div>

        <div className="flex h-full flex-col gap-y-6">
          <div className="flex h-full flex-col gap-y-3">
            <Text variant="title" size="xl">
              내용
            </Text>
            <TextArea
              name="content"
              className="h-full"
              wrapperStyle={" h-full"}
              placeholder="내용을 입력해 주세요."
              defaultValue={initialData?.content ? initialData?.content : ""}
              helper={contentError ? { type: "error", text: contentError } : null}
            />
          </div>

          <div className="flex h-1/3 flex-col justify-between">
            <div className="flex flex-col gap-y-3">
              <Text variant="title" size="xl">
                이미지
              </Text>

              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="border-button-secondary-border h-9"
                  onClick={onClickFileInput}
                >
                  <Text className="mx-auto">이미지 첨부하기</Text>
                </Button>
                {file && <Text className="line-clamp-1">{file.name}</Text>}
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
              <Button type="submit" className="w-full" variant="submit">
                <span className="mx-auto">{mode === "edit" ? "수정" : "작성"}</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostWritePage;
