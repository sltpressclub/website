import React from "react";
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
