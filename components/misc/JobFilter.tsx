import { filterJobs } from "@/actions";
import React, { FC } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectOwn from "../ui/SelectOwn";
import prismaDB from "@/lib/db";
import { jobTypes } from "@/lib/job-types";
import { Button } from "../ui/button";
import { jobFilterType } from "@/lib/validation";
import SubmitButton from "../SubmitButton";

type JobFilterprops = {
  defaultValues: jobFilterType;
};

const JobFilter: FC<JobFilterprops> = async ({ defaultValues }) => {
  const locations = (await prismaDB.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((res) =>
      res.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="lg:w-[260px] sticky top-0 h-fit bg-background border rounded-lg ">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4 px-5 py-2">
          <div className="flex flex-col gap-4">
            <Label htmlFor="query">Search</Label>
            <Input
              id="query"
              placeholder="Title, company etc..."
              defaultValue={defaultValues.query}
              name="query"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <SelectOwn
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value={""}>All Types</option>

              {jobTypes.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </SelectOwn>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <SelectOwn
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value={""}>All locations</option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </SelectOwn>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilter;
