
import { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  closeButton = true,
  className = "",
  theme = "light",
  richColors = false,
  position = "bottom-right",
  ...props
}) => {
  // Fix React hydration SSR issues with a simple client-only rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sonner
      theme={theme}
      richColors={richColors}
      className={className}
      toastOptions={{
        classNames: {
          toast: "group w-full font-sans shadow-lg relative grid grid-cols-[auto,1fr] items-center gap-4 overflow-hidden rounded-md border p-4 pr-8",
          description: "text-sm text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring inline-flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50",
          cancelButton:
            "border-border hover:bg-muted hover:text-muted-foreground focus:ring-ring inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50",
          info: "toast border text-foreground bg-background",
          success: "toast border text-foreground bg-background",
          warning: "toast border text-foreground bg-background",
          error: "toast border text-foreground bg-background",
        },
      }}
      closeButton={closeButton}
      position={position}
      {...props}
    />
  );
};

export { Toaster };
