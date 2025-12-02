import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textStyles = cva("font-normal text-text-primary leading-[1.6]", {
  variants: {
    variant: {
      body: "",
      caption: "",
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

function Text({ as: Component = "span", variant, size, align, className, children, ...props }) {
  return (
    <Component className={cn(textStyles({ variant, size, align }), className)} {...props}>
      {children}
    </Component>
  );
}

export default Text;
