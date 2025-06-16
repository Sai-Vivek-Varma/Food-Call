
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    default: "bg-sage-500 text-white hover:bg-sage-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-sage-500 text-sage-700 hover:bg-sage-50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-sage-500 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
