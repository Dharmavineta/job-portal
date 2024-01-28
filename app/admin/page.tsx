import Heading from "@/components/Heading";
import JobList from "@/components/misc/JobList";
import prismaDB from "@/lib/db";
import Link from "next/link";
import React from "react";

const AdminPage = async () => {
  const unapprovedJobs = await prismaDB.job.findMany({
    where: { approved: false },
  });
  return (
    <main className=" mx-auto my-10 max-w-5xl space-y-10 px-3">
      <Heading heading="Admin Dashboard" />
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved Jobs</h2>
        {unapprovedJobs.map((job) => (
          <Link href={`/admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobList job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
};

export default AdminPage;
