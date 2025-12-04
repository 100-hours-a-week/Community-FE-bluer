import { cn } from "@/utils/cn";

const DEFAULT_ORIENTATION = "horizontal";
// const ORIENTATIONS = ['horizontal', 'vertical'];

function Separator(props) {
  const { orientation = DEFAULT_ORIENTATION, className, ...others } = props;
  const seperatorOrientation = orientation ? orientation : DEFAULT_ORIENTATION;

  return (
    <div
      data-orientation={seperatorOrientation}
      className={cn(
        "bg-border-grey shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...others}
    />
  );
}

export default Separator;
