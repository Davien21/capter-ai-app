import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

import "../index.scss";

import Head from "next/head";
import PageHeadSetup from "../pageHeads/pageHeadSetup";
import { PageLoader } from "components";
import { useRouteChangeHandler } from "hooks";
import { NextPageWithLayout } from "interfaces";
import { Toaster } from "sonner";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.getLayout ?? ((page) => page);
  const { isPageLoading } = useRouteChangeHandler();
  const BodyComponent = layout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Capter AI</title>
        {/* <link rel="preconnect" href="https://res.cloudinary.com" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      {/* <PageHeadSetup /> */}
      <Toaster
        position="top-center"
        duration={5000}
        closeButton
        // richColors
      />
      {isPageLoading ? <PageLoader /> : BodyComponent}
    </>
  );
}

export default MyApp;
