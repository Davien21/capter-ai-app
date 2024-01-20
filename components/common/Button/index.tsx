import React, { Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import styles from "./button.module.scss";
import { SpinnerIcon } from "components";

type IFormType = "unstyled" | "primary";
function Button({
  disabled,
  form = "primary",
  children,
  className,
  onClick,
  type = "button",
  isLoading = false,
  href,
  rel,
  target,
  ...rest
}: {
  disabled?: boolean;
  form?: IFormType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  rest?: any;
  rel?: string;
  isLoading?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}) {
  let containerClass = "";
  if (form && form !== "unstyled") containerClass += styles.container;
  if (form && form !== "unstyled") containerClass += ` ${styles[form]}`;
  if (className) containerClass += ` ${className}`;
  if (rel && href) (rest as any).rel = rel;

  if (href && !disabled) {
    return (
      <Link href={href}>
        <a target={target || "_self"} className={containerClass} {...rest}>
          {isLoading === true && <SpinnerIcon />}
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={containerClass}
      onClick={onClick}
      {...rest}
      disabled={disabled || isLoading}
    >
      {isLoading && <SpinnerIcon />}
      {children}
    </button>
  );
}

export { Button };
