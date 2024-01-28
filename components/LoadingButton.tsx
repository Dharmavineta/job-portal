import React, { FC } from "react";
import { boolean } from "zod";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
};

const LoadingButton: FC<props> = ({ children, loading, ...props }) => {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </span>
    </Button>
  );
};

export default LoadingButton;
