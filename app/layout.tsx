import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: [{ url: "/logo.png", href: "/logo.png" }],
  title: {
    default: "Jobs",
    template: "%s| Flow Jobs ",
  },
  description: "Jobs made easy for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(" min-w-[350ppx]", inter.className)}>
        <Navbar />
        <main className="min-h-screen"> {children}</main>

        <Footer />
      </body>
    </html>
  );
}
