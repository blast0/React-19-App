import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const Textarea = React.forwardRef(
  ({ containerClassName = "", className, label = "", ...props }, ref) => {
    return (
      <div className={containerClassName}>
        <Label>{label}</Label>
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-200 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
