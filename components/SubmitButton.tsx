"use client";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import LoadingButton from "./LoadingButton";

type props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton: FC<props> = ({ ...props }) => {
  const { pending } = useFormStatus();
  return <LoadingButton {...props} type="submit" loading={pending} />;
};

export default SubmitButton;
