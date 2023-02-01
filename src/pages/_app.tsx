import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Default from "@/layouts/Default";
import Head from "next/head";
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import { Meal, mealsAtom } from "@/data/mealsAtom";
import { collection, getDocs } from "firebase/firestore";
import { ordersAtom } from "@/data/ordersAtom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0 ,user-scalable=0"
        />
      </Head>
      <RecoilRoot>
      <Default>
        <Component {...pageProps} />
      </Default>
      </RecoilRoot>
    </>
  );
}
