import React, { FC } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  title: string;
  subtitle?: string;
};

const Layout: FC<LayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="grid grid-rows-layout h-screen">
      <Head>
        <title>poodle | scheduling for groups</title>
        <meta
          name="description"
          content="Easy decision making for group activities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-2xl sm:mx-auto py-6 px-2">
        <h1
          className={`${
            subtitle ? "mb-2" : "mb-2 sm:mb-4"
          } text-4xl sm:text-6xl font-bold italic`}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 className="mb-2 sm:mb-4 text-xl sm:text-2xl italic">
            {subtitle}
          </h2>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
