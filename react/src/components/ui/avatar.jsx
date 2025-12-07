import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "@/utils/cn";

const avatarStyles = cva(
  "overflow-hidden rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-white font-medium",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Avatar(props) {
  const { size, imgUrl, alt = "", fallbackText, className } = props;
  const [error, setError] = useState(false);

  const showFallback = error || !imgUrl;

  return (
    <div className={cn(avatarStyles({ size }), className)}>
      {showFallback ? (
        <span>{fallbackText}</span>
      ) : (
        <img
          className="h-full w-full object-cover"
          src={imgUrl}
          alt={alt}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default Avatar;
