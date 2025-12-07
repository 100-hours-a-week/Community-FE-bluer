import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const iconButtonStyles = cva("flex items-center justify-center cursor-pointer ", {
  variants: {
    size: {},
    variant: {},
  },
  defaultVariants: {},
});

function IconButton(props) {
  const { as: Component = "button", size, variant, className, children, ...others } = props;

  return (
    <Component className={cn(iconButtonStyles({ size, variant }), className)} {...others}>
      {children}
    </Component>
  );
}

export default IconButton;
