import { Job } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

type props = {
  job: Job;
};

const JobList: FC<props> = ({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/90">
      <Image
        src={"/logo.png"}
        className="self-center rounded-lg"
        width={100}
        height={100}
        alt=""
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-x-1 sm:hidden">
            <Briefcase size={15} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-x-1 ">
            <MapPin size={15} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-x-1 sm:hidden">
            <Globe2 size={15} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-x-1">
            <Banknote size={15} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-x-1 sm:hidden">
            <Clock size={15} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge className="bg-slate-300 text-black">{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={15} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobList;
