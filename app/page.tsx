import JobResults from "@/components/JobResults";
import JobFilter from "@/components/misc/JobFilter";
import prismaDB from "@/lib/db";
import { jobFilterType } from "@/lib/validation";
import { Metadata } from "next";
import React, { FC } from "react";

type props = {
  searchParams: {
    query: string;
    type: string;
    location: string;
    remote: boolean;
    page?: string;
  };
};

function getTitle({ query, type, location, remote }: jobFilterType) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? `Remote dev jobs`
        : "All dev jobs";

  const titleSuffix = location ? ` in ${location}` : "";
  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { location, query, remote, type },
}: props): Metadata {
  return {
    title: `${getTitle({
      query,
      type,
      location,
      remote: String(remote) === "true",
    })}| Flow Jobs`,
  };
}

const Home: FC<props> = async ({
  searchParams: { location, query, type, remote, page },
}) => {
  const filterValues: jobFilterType = {
    query,
    type,
    location,
    remote: String(remote) === "true",
  };

  return (
    <main className="m-auto my-10 w-full space-y-10  px-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValues)}{" "}
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex w-full flex-col gap-5 lg:flex-row">
        <JobFilter defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
};

export default Home;
