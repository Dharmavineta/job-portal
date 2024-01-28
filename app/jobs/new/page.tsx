import { Metadata } from "next";
import React from "react";
import JobForm from "./_components/JobForm";

export const metaData: Metadata = {
  title: "Post a New Job",
};

const Job = () => {
  return (
    <div>
      <JobForm />
    </div>
  );
};

export default Job;
