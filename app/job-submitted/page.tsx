import Heading from "@/components/Heading";
import React from "react";

const JobSubmitPage = () => {
  return (
    <main className=" m-auto max-w-5xl space-y-5 px-3 text-center">
      <Heading heading="Job Submitted" />
      <p>Your Job Posting is submitted, and is pending approval</p>
    </main>
  );
};

export default JobSubmitPage;
