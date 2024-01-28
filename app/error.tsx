"use client";
import Heading from "@/components/Heading";
import React from "react";

const error = () => {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 text-center">
      <Heading heading="Unexpected error occured" />
    </main>
  );
};

export default error;
