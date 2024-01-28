import * as z from "zod";
import { jobTypes, locationTypes } from "./job-types";

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const requiredString = z.string().min(1, "Required");

const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      { message: "Invalid Location type" },
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    { message: "Location is needed", path: ["location"] },
  );

export const createJobSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title must be more than 1 character" })
      .max(100),

    type: z
      .string()
      .min(1, "required")
      .refine((value) => jobTypes.includes(value), {
        message: "Invalid job input",
      }),

    companyName: z.string().min(1, "required"),
    companylogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be larger than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type createJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobFilterType = z.infer<typeof jobFilterSchema>;
