import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
  "inline-flex items-center  text-center rounded-md font-medium transition disabled:cursor-not-allowed leading-8",
  {
    variants: {
      variant: {
        primary: "bg-button-bg-primary text-button-text-primary border-none",
        secondary:
          "bg-button-bg-secondary  text-button-text-secondary border border-solid border-black",
      },
      disabled: {
        true: "",
        false: "",
      },
      size: {
        sm: "px-3",
        md: "px-4",
        lg: "px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

function Button({ variant, disabled, size, className, children, ...props }) {
  return (
    <button
      className={cn(buttonStyles({ variant, disabled, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
