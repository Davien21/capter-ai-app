import React from "react";

import styles from "./styles.module.scss";

const PageLoader = () => {
  return (
    <div
      className={`${styles["container"]} h-screen flex items-center justify-center `}
    >
      <span className="text-2xl">Loading...</span>
    </div>
  );
};

export { PageLoader };
