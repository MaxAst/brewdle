import React, { FC } from "react";
import Header from "./Header";

type LayoutProps = {
  title: string;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen p-2">
      <Header />
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-2 sm:mb-4 text-4xl sm:text-6xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
