import Footer from "@/components/shared/Footer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "MAR Pre-Order | Home",
  description:
    "MAR Group is a leading provider of services to the energy industry",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>Navbar</h1>
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
