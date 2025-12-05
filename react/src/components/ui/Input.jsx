import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "@/utils/cn";
import IconButton from "@/components/ui/IconButton";
import Text from "@/components/ui/Text";

const inputStyles = cva(
  "w-full flex items-center flex items-center justify-center rounded-lg border border-transparent px-4 py-3 outline-none",
  {
    variants: {
      variant: {
        filled: "bg-input-bg-filled",
        outlined: "border-border-grey border",
        error: "border-base-error border",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

function Input(props) {
  const {
    variant = "filled",
    type = "text",
    className,
    helper,
    isPasswordVisible = false,
    ...others
  } = props;
  const [inputType, setInputType] = useState(type);

  const onTogglePasswordType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className={`${helper ? "flex flex-col" : "flex flex-row"}`}>
      <div className="relative flex w-full flex-row">
        <input type={inputType} className={cn(inputStyles({ variant }), className)} {...others} />
        {isPasswordVisible && (
          <IconButton className="right absolute top-4 right-3" onClick={onTogglePasswordType}>
            {inputType === "text" ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </IconButton>
        )}
      </div>
      {helper ? (
        <Text
          className={`mt-1.5 pl-2 ${helper.type === "error" ? "text-(--color-base-error)" : ""}`}
        >
          {helper.text}
        </Text>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Input;
