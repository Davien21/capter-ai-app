import React, { useState, useEffect } from "react";
import styles from "./google-button.module.scss";

import { SpinnerIcon } from "components/common/SpinnerIcon";
import { Button } from "components/ui/button";
import { GoogleIcon } from "assets/images";
import { GOOGLE_AUTH_URL } from "utilities/constants";
import { useRouter } from "next/router";

export function GoogleButton({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  let containerClass = styles.container || "gap-x-3 py-3";
  if (className) containerClass += ` ${className}`;
  if (isLoading) containerClass += ` ${styles["loading"]}`;

  const handleRequestAuth = async () => {
    setLoading(true);
    window.open(GOOGLE_AUTH_URL, "_blank");

    const checkAuth = setInterval(() => {
      const isDoneWithGoogle =
        window.localStorage.getItem("cai-is-google-auth");
      if (isDoneWithGoogle) {
        clearInterval(checkAuth);
        setLoading(false);
        window.localStorage.removeItem("cai-is-google-auth");
        router.push("/");
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(checkAuth);
      setLoading(false);
    }, 60000);
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Button
      variant={"outline"}
      type={"button"}
      className={containerClass}
      onClick={handleRequestAuth}
      isLoading={isLoading}
    >
      <GoogleIcon />
      <span>{text || "Continue with Google"}</span>
    </Button>
  );
}
