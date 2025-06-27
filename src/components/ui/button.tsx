import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-3 font-medium text-base rounded-xl px-6 py-3 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#111827] text-gray-100 hover:bg-[#1f2937] hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-gray-300 bg-transparent text-white hover:bg-[#111827]/30",
        secondary:
          "bg-gray-700 text-white hover:bg-gray-600",
        ghost:
          "bg-transparent text-white hover:bg-[#111827]/30",
        link:
          "text-indigo-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div className="relative inline-flex group">
        {/* Glowing background layer */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:duration-200" />

        {/* Actual button */}
        <Comp
          className={cn(
            "relative z-10",
            buttonVariants({ variant, size }),
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
          <svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            height={10}
            width={10}
            fill="none"
            className="ml-2 mt-0.5 -mr-1 stroke-white stroke-2"
          >
            <path
              d="M0 5h7"
              className="transition opacity-0 group-hover:opacity-100"
            />
            <path
              d="M1 1l4 4-4 4"
              className="transition group-hover:translate-x-[3px]"
            />
          </svg>
        </Comp>
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
