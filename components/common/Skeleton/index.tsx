import React from "react";
import styles from "./skeleton.module.scss";

interface SkeletonProps {
  type: "avatar" | "text" | "circle" | "skeleton";
  width?: string;
  height?: string;
  className?: string;
  speed?: 'normal' | 'fast';
}

const SkeletonElement: React.FC<SkeletonProps> = ({
  type,
  width = "100%",
  height = "100%",
  className,
  speed = 'normal'
}) => {
  const style = { width, height };
  let containerClass = `${styles["skeleton"]} ${styles[type]} ${styles[speed]}`;
  if (className) containerClass += ` ${className}`;
  return <div className={containerClass} style={style} />;
};

const Skeleton = {
  Avatar: (props: Omit<SkeletonProps, "type">) => (
    <SkeletonElement type="avatar" {...props} />
  ),
  Text: (props: Omit<SkeletonProps, "type">) => (
    <SkeletonElement type="text" {...props} />
  ),
  Circle: (props: Omit<SkeletonProps, "type">) => (
    <SkeletonElement type="circle" {...props} />
  ),
  Image: (props: Omit<SkeletonProps, "type">) => (
    <SkeletonElement type="skeleton" {...props} />
  ),
};

export { Skeleton };
