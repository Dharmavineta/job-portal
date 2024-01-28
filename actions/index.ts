"use server";

import { isAdmin, toSlug } from "@/lib/utils";
import { createJobSchema, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { del, put } from "@vercel/blob";
import path from "path";
import prismaDB from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const filterJobs = (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const { location, query, remote, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

export const createJob = async (formData: FormData) => {
  // const values = Object.entries(formData.entries());

  const values: { [key: string]: any } = {};

  for (let [key, value] of formData.entries()) {
    values[key] = value;
  }

  const {
    companyName,
    locationType,
    salary,
    title,
    description,
    type,
    applicationEmail,
    applicationUrl,
    companylogo,
    location,
  } = createJobSchema.parse(values);

  const slug = ` ${toSlug(title)}- ${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;
  if (companylogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companylogo.name)}`,
      companylogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    companyLogoUrl = blob.url;
  }

  await prismaDB.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      location,
    },
  });

  redirect("/job-submitted");
};

type FormState = { error?: string } | undefined;

export const approveSubmission = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const jobId = formData.get("jobId") as string;

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorised");
    }

    await prismaDB.job.update({
      where: {
        id: jobId,
      },
      data: { approved: true },
    });
    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};

export async function DeleteJob(prevState: FormState, formData: FormData) {
  try {
    const jobId = formData.get("jobId") as string;

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorised");
    }

    const job = await prismaDB.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prismaDB.job.delete({
      where: { id: jobId },
    });
    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/admin");
}
