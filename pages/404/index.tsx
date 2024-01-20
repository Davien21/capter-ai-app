import React from "react";

import { Button } from "components";

import styles from "./404.module.css";

function NotFoundPage() {
  return (
    <>
      <main className={`${styles["container"]} h-[100dvh]`}>
        <section className="h-full">
          <div className="h-full container pb-14 2xl:pb-20 md:py-14 2xl-py-20 flex flex-col gap-y-4 md:gap-y-6 items-center text-center justify-center">
            <p>Capter AI</p>
            <h2 className="font-bold text-2xl md:text-6xl ">
              Uh oh, we can’t find that page...
            </h2>
            <p className="text-grey-2 text-lg md:text-xl">
              Sorry, the page you are looking for {`doesn’t`} exist or has been
              moved.
            </p>
            <div className="flex gap-x-5">
              <Button href="/" className="mb-10">
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default NotFoundPage;
