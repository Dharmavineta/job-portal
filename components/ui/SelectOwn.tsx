import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";

const SelectOwn = forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(({ className, ...props }: React.HTMLProps<HTMLSelectElement>, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 border w-full rounded-md appearance-none truncate bg-background border-input py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      ></select>
      <ChevronDown className="w-4 h-4 absolute right-3 top-3" />
    </div>
  );
});

SelectOwn.displayName = "SelectOwn";

export default SelectOwn;
