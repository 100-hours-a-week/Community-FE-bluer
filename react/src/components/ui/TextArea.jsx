import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textAreaStyles = cva(
  "w-full p-2 flex items-center flex items-center justify-center rounded-lg border border-transparent outline-none resize-none",
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

function TextArea(props) {
  const { variant = "filled", className, endAdornment, ...others } = props;

  return (
    <div className="flex w-full flex-col">
      <div className="relative flex w-full items-center text-center">
        <textarea
          className={cn(textAreaStyles({ variant }), endAdornment && "pr-10", className)}
          {...others}
        />

        {endAdornment && <div className="absolute right-3 flex items-center">{endAdornment}</div>}
      </div>
    </div>
  );
}

export default TextArea;
