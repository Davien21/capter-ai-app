import React, { useEffect } from "react";

export default function GoogleAuthPage() {
  useEffect(() => {
    window.localStorage.setItem("cai-is-google-auth", "true");
    window.close();
  }, []);

  return <div></div>;
}
