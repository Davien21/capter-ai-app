import React from "react";

import styles from "./footer.module.scss";
import { Button } from "components";
import {
  InstagramIcon,
  LogoIcon,
  SpotifyIcon,
  TiktokIcon,
  YoutubeIcon,
} from "assets/images";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className={`${styles["container"]} bg-bl ack-2 text- white text-center`}>
      Footer
    </footer>
  );
}

export { Footer };
