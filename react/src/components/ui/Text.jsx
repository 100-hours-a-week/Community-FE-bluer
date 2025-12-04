import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textStyles = cva("font-normal text-text-primary leading-[1.6]", {
  variants: {
    variant: {
      body: "font-normal",
      caption: "font-light",
      title: "font-semibold",
      label: "font-medium",
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
  },
});

function Text(props) {
  const { as: Component = "span", variant, size, align, className, children, ...others } = props;

  return (
    <Component
      className={`${cn(textStyles({ variant, size, align }), className)} wrap-break-word`}
      {...others}
    >
      {children}
    </Component>
  );
}

export default Text;
