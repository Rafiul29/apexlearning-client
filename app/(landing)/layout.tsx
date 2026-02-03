import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React from "react";

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
