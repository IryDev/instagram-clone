import { clx } from "@/lib/utils/clx/clx-merge";
import { cn } from "@/lib/utils/core/cn";
import * as React from "react";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const inputClasses = cn(
  "flex h-10 w-full rounded-md border border-input bg-background py-2 px-2.5 pb-2.5 pt-4 bg-card text-sm ring-offset-background peer",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground placeholder:text-xs placeholder",
  "focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "autofill:bg-transparent"
);

const FloatingLabel = clx.label(
  "absolute text-sm text-gray-400 font-light dark:text-gray-400 pointer-events-none",
  "scale-75 peer-focus:scale-75 duration-300 transform peer-placeholder-shown:scale-100",
  "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
  "peer-focus:dark:text-muted-foreground",
  {
    variants: {
      variant: {
        outlined:
          "-translate-y-4 peer-focus:-translate-y-4 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:px-2 peer-focus:top-2  start-1",
      },
    },
    defaultVariants: {
      variant: "outlined" as const,
    },
  }
);

//
// TODO FIX 🐛: `clx.input` with variants needs to have children
export const InputLabelFloating = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, type, label, ...props }, ref) => {
  const [show, setShow] = useState(false);

  if (type === "password") {
    return (
      <div className="relative w-full">
        <button
          onClick={() => setShow((prev) => !prev)}
          className={`absolute right-1.5 ${
            props.value ? "block" : "hidden"
          } top-1/2 -translate-y-1/2 transform px-1`}
          type="button"
        >
          {show ? (
            // <Eye className="size-4 text-muted-foreground" />
            <p className="font-semibold hover:opacity-50 dark:hover:opacity-50 dark:text-white text-sm">
              Hide
            </p>
          ) : (
            // <EyeOff className="size-4 text-muted-foreground" />
            <p className="font-semibold hover:opacity-50 dark:hover:opacity-50 dark:text-white text-sm">
              Show
            </p>
          )}
        </button>
        <input
          className={cn(inputClasses, className)}
          type={!show ? "password" : "text"}
          id="floating_outlined"
          placeholder=" "
          ref={ref}
          {...props}
        />
        <FloatingLabel htmlFor="floating_outlined" variant="outlined">
          {label}
        </FloatingLabel>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        className={cn(inputClasses, className)}
        type={type}
        id="floating_outlined"
        placeholder=" "
        ref={ref}
        {...props}
      />
      <FloatingLabel htmlFor="floating_outlined" variant="outlined">
        {label}
      </FloatingLabel>
    </div>
  );
});
