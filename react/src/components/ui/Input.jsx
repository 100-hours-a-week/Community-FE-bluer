import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cva } from "class-variance-authority";
import { useCallback, useMemo, useState } from "react";
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
  const { variant = "filled", type = "text", className, helper, endAdornment, ...others } = props;

  const [inputType, setInputType] = useState(type);

  const onTogglePasswordType = useCallback(() => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  }, [setInputType]);

  const passwordToggle = useMemo(() => {
    return (
      inputType === "password" && (
        <IconButton type="button" onClick={onTogglePasswordType}>
          <FontAwesomeIcon icon={inputType === "text" ? faEye : faEyeSlash} />
        </IconButton>
      )
    );
  }, [inputType, onTogglePasswordType]);

  const finalEndAdornment = endAdornment || passwordToggle;

  return (
    <div className="flex w-full flex-col">
      <div className="relative flex w-full items-center">
        <input
          type={inputType}
          className={cn(inputStyles({ variant }), finalEndAdornment && "pr-10", className)}
          {...others}
        />

        {finalEndAdornment && (
          <div className="absolute right-3 flex items-center">{finalEndAdornment}</div>
        )}
      </div>

      {helper && (
        <Text
          className={`mt-1.5 pl-2 ${helper.type === "error" ? "text-(--color-base-error)" : ""}`}
        >
          {helper.text}
        </Text>
      )}
    </div>
  );
}

export default Input;
