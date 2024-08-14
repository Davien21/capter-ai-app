import React from "react";
import styles from "./header.module.scss";
import { ExitIcon } from "@radix-ui/react-icons";
import { Logout } from "services/authService";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await Logout();
    router.push("/");
  };

  return (
    <>
      <header className={`${styles.container} container `}>
        <div className="flex justify-between">
          <h1 className="uppercase text-center text-lg">Capter.ai</h1>
          <button className="p-1" onClick={handleLogout}>
            <ExitIcon />
          </button>
        </div>
      </header>
    </>
  );
}

export { Header };
