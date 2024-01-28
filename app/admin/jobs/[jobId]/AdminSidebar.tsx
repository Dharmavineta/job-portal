"use client";
import { DeleteJob, approveSubmission } from "@/actions";
import SubmitButton from "@/components/SubmitButton";
import { Job } from "@prisma/client";
import React, { FC } from "react";
import { useFormState } from "react-dom";

type props = {
  job: Job;
};

const AdminSidebar: FC<props> = ({ job }) => {
  return (
    <aside className=" flex w-[270px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <>
          <ApproveSubmissionButton jobId={job.id} />
        </>
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

type adminButtonProps = {
  jobId: string;
};

function ApproveSubmissionButton({ jobId }: adminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <SubmitButton className="w-full bg-green-500 hover:bg-green-400">
        Approve
      </SubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: adminButtonProps) {
  const [formState, formAction] = useFormState(DeleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <SubmitButton className="w-full bg-red-500 hover:bg-red-400">
        Delete Job
      </SubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
