import Image from "next/image";
import React from "react";
import { getBlurPath } from "../../../utils/img-blur-path";
import { useIsClient } from "usehooks-ts";

type ComponentProps = {
  sizes?: string;
  src: string;
  alt?: string;
  priority?: boolean;
  width: number;
  height: string | number;
  quality?: number;
  unoptimized?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  onLoadingComplete?: () => void;
  onLoadStart?: () => void;
};

function CloudinaryImage({
  sizes,
  src,
  alt,
  priority,
  width,
  height,
  quality = 100,
  unoptimized,
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  onLoadStart,
  onLoadingComplete,
}: ComponentProps) {
  const isClient = useIsClient();
  return (
    <>
      {isClient && (
        <Image
          onLoadStart={onLoadStart}
          onLoadingComplete={onLoadingComplete}
          sizes={sizes}
          unoptimized={unoptimized || false}
          className={className}
          objectFit={objectFit}
          objectPosition={objectPosition}
          priority={priority || false}
          loading="eager"
          alt={alt || ""}
          src={src}
          quality={quality}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={getBlurPath(src)}
        />
      )}
    </>
  );
}

export { CloudinaryImage };
