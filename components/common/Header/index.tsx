import React from "react";
import styles from "./header.module.scss";

function Header() {
  return (
    <>
      <header className={`${styles.container} container `}>
        <h1 className="uppercase text-center text-lg">Capter.ai</h1>
      </header>
    </>
  );
}

export { Header };
