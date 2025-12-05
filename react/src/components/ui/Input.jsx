import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Text from "./Text";

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
  const { variant = "filled", className, helper, ...others } = props;
  return (
    <div className={`${helper ? "flex flex-col" : "flex flex-row"}`}>
      <input className={cn(inputStyles({ variant }), className)} {...others} />
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
