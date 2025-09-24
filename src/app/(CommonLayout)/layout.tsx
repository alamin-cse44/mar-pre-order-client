import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
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
      <Navbar />
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
