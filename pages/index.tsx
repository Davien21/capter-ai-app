import React, { useEffect, useState } from "react";

import { Header, Footer } from "components";
import { GetStaticProps } from "next";

import styles from "./home-page.module.scss";

import { SWRConfig } from "swr";

import { GetAllProducts } from "services/productService";
import { HttpError } from "utils/http-errors";

function Index() {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`${styles["container"]} flex-1`}>
        <div>
          <p className="text-center">Hi</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function IndexPage({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const productsResponse = await GetAllProducts();

    return {
      props: {
        fallback: {
          [`/api/products`]: productsResponse,
        },
      },
    };
  } catch (error) {
    const httpError = error as HttpError;
    console.log(httpError);
    const message = httpError.message;

    return {
      props: {
        fallback: {
          [`/api/products`]: { data: [] },
        },
      },
    };
  }
};
