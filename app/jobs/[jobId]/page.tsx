import JobDetailsPage from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
import prismaDB from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { FC, cache } from "react";

type props = {
  params: { jobId: string };
};

const getJob = cache(async (jobId: string) => {
  const job = await prismaDB.job.findUnique({
    where: {
      slug: jobId,
    },
  });
  if (!job) {
    notFound();
  }
  return job;
});

export async function generateStaticParams() {
  const jobs = await prismaDB.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });
  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { jobId },
}: props): Promise<Metadata> {
  const job = await getJob(jobId);

  return { title: job.title };
}

const JobDetails: FC<props> = async ({ params }) => {
  const job = await getJob(params.jobId);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? ` mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 md:items-start lg:flex-row">
      <JobDetailsPage job={job} />
      <aside className="mx-10">
        <Button asChild>
          <Link href={applicationLink} className=" w-40 md:w-fit">
            Apply now
          </Link>
        </Button>
      </aside>
    </main>
  );
};

export default JobDetails;
