import JobDetailsPage from "@/components/JobDetailsPage";
import prismaDB from "@/lib/db";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import AdminSidebar from "./AdminSidebar";

type props = {
  params: {
    jobId: string;
  };
};

const AdminJobs: FC<props> = async ({ params }) => {
  const job = await prismaDB.job.findUnique({
    where: {
      slug: params.jobId,
    },
  });

  if (!job) {
    notFound();
  }
  return (
    <main className=" m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default AdminJobs;
