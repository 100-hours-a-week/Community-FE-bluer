import { useRef } from "react";

function useFileInput(props) {
  const { onFileChangeSuccess, onFileChangeReject } = props;
  const inputRef = useRef(null);

  const onClickFileInput = () => {
    inputRef.current.click();
  };

  const onChange = (event) => {
    const { target } = event;
    const file = target.files[0];

    if (file) {
      if (onFileChangeSuccess) {
        onFileChangeSuccess(file);
      }
      return;
    }

    if (onFileChangeReject) {
      onFileChangeReject();
    }
  };

  return { inputRef, onClickFileInput, onChange };
}

export default useFileInput;
