import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputStyles = cva(
  "flex items-center bg-input-bg-filled flex items-center justify-center rounded-lg border border-transparent px-4 py-3 outline-none",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
        error: "",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

function Input(props) {
  const { variant = "filled", className, ...others } = props;
  return <input className={cn(inputStyles({ variant }), className)} {...others} />;
}

export default Input;
