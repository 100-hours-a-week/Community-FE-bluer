import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textStyles = cva(" leading-[1.6]", {
  variants: {
    variant: {
      body: "font-normal",
      caption: "font-light",
      title: "font-semibold",
      label: "font-medium",
    },
    hierarchy: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    size: "md",
    align: "left",
    hierarchy: "primary",
  },
});

function Text(props) {
  const {
    as: Component = "span",
    variant,
    size,
    align,
    hierarchy,
    className,
    children,
    ...others
  } = props;

  return (
    <Component
      className={`${cn(textStyles({ variant, size, align, hierarchy }), className)} wrap-break-word`}
      {...others}
    >
      {children}
    </Component>
  );
}

export default Text;
