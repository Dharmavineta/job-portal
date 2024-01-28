"use client";
import Heading from "@/components/Heading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createJobSchema, createJobValues } from "@/lib/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SelectOwn from "@/components/ui/SelectOwn";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/components/LocationInput";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";
import { createJob } from "@/actions";

const JobForm = () => {
  const form = useForm<createJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (values: createJobValues) => {
    const formData = new FormData();

    const data = Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await createJob(formData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const loading = form.formState.isSubmitting;

  return (
    <main className="mx-auto my-10 max-w-3xl space-y-10">
      <div className="text-center">
        <Heading heading="Find your perfect Developer" />
        <p className="text-muted-foreground">
          Get your Job postings seen by people all over the world
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job Details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Backend Developer"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <SelectOwn {...field} defaultValue={""}>
                        <option value={""} hidden>
                          Select an Option
                        </option>
                        {jobTypes.map((job) => (
                          <option key={job} value={job}>
                            {job}
                          </option>
                        ))}
                      </SelectOwn>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Samsung"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companylogo"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        disabled={loading}
                        type="file"
                        accept="images/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <SelectOwn
                        {...field}
                        defaultValue={""}
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.currentTarget.value) {
                            form.trigger("location");
                          }
                        }}
                      >
                        <option value={""} hidden>
                          Select an Option
                        </option>
                        {locationTypes.map((job) => (
                          <option key={job} value={job}>
                            {job}
                          </option>
                        ))}
                      </SelectOwn>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Location</FormLabel>
                    <FormControl>
                      <LocationInput
                        onLocationSelected={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    {form.watch("location") && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="flex items-center gap-x-2"
                          onClick={() => {
                            form.setValue("location", "", {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <span className="text-sm">
                          {form.watch("location")}
                        </span>
                      </div>
                    )}
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="applicationEmail">How to apply</Label>
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="applicationEmail"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex items-center ">
                            <Input
                              type="email"
                              placeholder="Email"
                              id="applicationEmail"
                              {...field}
                            />
                            <span className="mx-2 text-xs">Or</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="applicationUrl"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Website"
                            id="applicationEmail"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("applicationEmail");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label onClick={() => form.setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="number" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5">
              <LoadingButton type="submit" loading={loading}>
                Submit
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default JobForm;
