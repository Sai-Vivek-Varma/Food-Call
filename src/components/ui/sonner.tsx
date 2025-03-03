
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster-container"
      toastOptions={{
        classNames: {
          toast: "toast show d-flex align-items-center justify-content-between bg-white border border-secondary rounded shadow-sm",
          description: "text-secondary",
          actionButton: "btn btn-primary btn-sm",
          cancelButton: "btn btn-secondary btn-sm",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
