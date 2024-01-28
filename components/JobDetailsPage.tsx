import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import {
  AppleIcon,
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import MarkdownComponent from "./markdown";

type props = {
  job: Job;
};

const JobDetailsPage: FC<props> = ({
  job: {
    applicationEmail,
    applicationUrl,
    approved,
    companyLogoUrl,
    companyName,
    description,
    createdAt,
    id,
    location,
    salary,
    locationType,
    slug,
    title,
    type,
    updatedAt,
  },
}) => {
  return (
    <section className=" w-full grow space-y-3 px-10">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            className="h-12 w-12 rounded-xl"
            alt={companyName}
            height={100}
            width={100}
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className=" text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-x-1">
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
          </div>
        </div>
      </div>
      <div>
        {description && <MarkdownComponent>{description}</MarkdownComponent>}
      </div>
    </section>
  );
};

export default JobDetailsPage;
