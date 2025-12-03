import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "@/utils/cn";

const containerStyles = cva("overflow-hidden bg-gray-100 rounded-lg", {
  variants: {
    ratio: {
      square: "aspect-square",
      wide: "aspect-[16/9]",
      standard: "aspect-[4/3]",
      tall: "aspect-[3/4]",
    },
    fit: {
      cover: "object-cover",
      contain: "object-contain",
    },
  },
  defaultVariants: {
    ratio: "standard",
    fit: "cover",
  },
});

function Image(props) {
  const {
    src,
    alt = "",
    ratio,
    fit = "cover",
    maxHeight,
    className,
    loadingClassName = "animate-pulse bg-gray-100",
    fallback,
  } = props;

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showFallback = error || !src;
  const useNaturalSize = !ratio;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg bg-gray-100",
        ratio && containerStyles({ ratio }),
        className
      )}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {!loaded && !showFallback && <div className={cn("h-full w-full", loadingClassName)} />}
      {showFallback && (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          {fallback || "No Image"}
        </div>
      )}
      {!showFallback && (
        <img
          src={src}
          alt={alt}
          className={cn(
            useNaturalSize ? "h-auto w-full" : "h-full w-full",
            fit === "cover" ? "object-cover" : "object-contain",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}

export default Image;
