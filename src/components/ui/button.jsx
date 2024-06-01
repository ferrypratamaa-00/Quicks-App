import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
    {
        variants: {
            variant: {
                default: "rounded-md",
                circle: "rounded-full",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
            color: {
                primary: "bg-primary text-white",
                dark: "bg-primary-dark text-white",
                grey: "bg-primary-grey text-white",
                light: "bg-primary-light text-white",
                purple: "bg-indicator-purple text-white",
                red: "bg-indicator-red text-white",
                yellow: "bg-indicator-yellow text-white",
                orange: "bg-indicator-orange text-white",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            color: "primary",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, color, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, color, className })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
