"use client";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AdminNav = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();
  return (
    <div className=" mt-5 px-3">
      <div className="mx-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href={"/admin"} className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <span className="font-semibold">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <button
            className=" rounded-lg bg-green-500 p-2 font-medium text-black hover:bg-green-400 hover:underline"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
