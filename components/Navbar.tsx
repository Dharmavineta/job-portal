import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between shadow-sm max-w-6xl mx-auto px-3 py-5 ">
        <Link href={"/"} className="flex items-center gap-1">
          <Image src={"/logo.png"} alt="" height={30} width={30} />
          <h1 className="font-bold text-xl tracking-tight">JOBS</h1>
        </Link>
        <Button asChild variant={"outline"}>
          <Link href={"/jobs/new"}>Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
