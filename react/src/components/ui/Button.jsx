import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
  "inline-flex items-center text-center rounded-md font-medium transition cursor-pointer disabled:cursor-not-allowed leading-8",
  {
    variants: {
      variant: {
        primary: "bg-button-bg-primary text-button-text-primary border-none",
        secondary:
          "bg-button-bg-secondary  text-button-text-secondary border border-solid border-button-secondary-border",
        submit: "bg-blue text-button-text-primary border-none ",
      },
      disabled: {
        true: "",
        false: "",
      },
      size: {
        xs: "p-2",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
        xl: "p-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

function Button(props) {
  const {
    as: Component = "button",
    variant,
    disabled,
    size,
    className,
    children,
    ...others
  } = props;

  return (
    <Component
      className={cn(buttonStyles({ variant, disabled, size }), className)}
      disabled={disabled}
      {...others}
    >
      {children}
    </Component>
  );
}

export default Button;
