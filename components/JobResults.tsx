import React, { FC } from "react";
import JobList from "./misc/JobList";
import { jobFilterType } from "@/lib/validation";
import prismaDB from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type props = {
  filterValues: jobFilterType;
  page?: number;
};

const JobResults: FC<props> = async ({ filterValues, page = 1 }) => {
  const { location, query, type, remote } = filterValues;

  const jobPerPage = 6;

  const skip = (page - 1) * jobPerPage;

  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prismaDB.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobPerPage,
    skip,
  });

  const countPromise = prismaDB.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div>
      <div className="flex-1 space-y-5">
        {jobs.map((job, i, arr) => (
          <Link
            key={job.id}
            href={`/jobs/${job.slug}`}
            className="block cursor-pointer"
          >
            <JobList job={job} />
          </Link>
        ))}

        {jobs.length === 0 && (
          <p className="m-auto text-center text-muted-foreground">
            No jobs found. Try adjusting your filters
          </p>
        )}
      </div>
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResults;

type paginationProps = {
  currentPage: number;
  totalPages: number;
  filterValues: jobFilterType;
};
function Pagination({
  currentPage,
  totalPages,
  filterValues: { location, query, remote, type },
}: paginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `?${searchParams.toString()}`;
  }
  return (
    <div className=" mt-10 flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Prev
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next Pages
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
