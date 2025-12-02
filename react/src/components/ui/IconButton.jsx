import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const iconButtonStyles = cva("flex items-center justify-center cursor-pointer ", {
  variants: {
    size: {},
    variant: {},
  },
  defaultVariants: {},
});

function IconButton({ as: Component = "button", size, variant, className, children, ...props }) {
  return (
    <Component className={cn(iconButtonStyles({ size, variant }), className)} {...props}>
      {children}
    </Component>
  );
}

export default IconButton;
