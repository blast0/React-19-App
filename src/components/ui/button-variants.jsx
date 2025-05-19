import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "cursor-pointer border bg-primary-dark-100 dark:border-slate-200 hover:bg-slate-200",
        // "bg-primary-dark-100 text-slate-50 shadow hover:bg-primary-dark-100/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "cursor-pointer bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "cursor-pointer border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "cursor-pointer bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "cursor-pointer hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "cursor-pointer text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-7 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-xs": "h-8 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
