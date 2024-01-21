import React from "react";

import styles from "./footer.module.scss";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer
      className={`${styles["container"]} bg-bl ack-2 text- white text-center`}
    >
      Capter AI &copy; {currentYear}
    </footer>
  );
}

export { Footer };
