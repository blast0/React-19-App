import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, unit = "", valueVisible = true, ...props }, ref) => (
    <>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center ",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-blue-500">
          <SliderPrimitive.Range className="absolute h-full bg-primary-dark-100 dark:bg-amber-600" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 cursor-pointer rounded-full border border-slate-200  bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-200 dark:bg-slate-50 dark:focus-visible:ring-slate-300" />
      </SliderPrimitive.Root>
      {valueVisible ? (
        <div className="flex items-center">
          {props.value} {unit}
        </div>
      ) : null}
    </>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
