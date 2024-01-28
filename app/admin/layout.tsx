import React, { FC } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import AdminNav from "./_components/admin-navbar";

type props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin",
};

const layout: FC<props> = ({ children }) => {
  return (
    <ClerkProvider>
      <AdminNav />
      {children}
    </ClerkProvider>
  );
};

export default layout;
