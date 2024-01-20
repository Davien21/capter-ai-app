import React from "react";

import { Button } from "components";

import styles from "./500.module.css";

export default function ServerErrorPage() {
  return (
    <>
      <main className={`${styles["container"]} h-[100dvh]`}>
        <section className="h-full">
          <div className="container h-full py-14 2xl:py-20 md:py-14 2xl-py-20 flex flex-col gap-y-4 md:gap-y-6 items-center text-center justify-center">
            <p>Capter AI</p>
            <h2 className="font-bold text-2xl md:text-6xl ">
              Oops, Something went wrong...
            </h2>
            <p className="text-grey-2 text-lg md:text-xl">
              Sorry, something went wrong. Please try again later.
            </p>
            <Button href="/" className="mb-10">
              Back to Home
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
