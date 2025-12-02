import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition disabled:cursor-not-allowed",
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
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-md",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

export default function Button({ variant, disabled, size, className, children, ...props }) {
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
