import { cn } from "@/lib/utils"

type ContainerProps = React.ComponentProps<"div">

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 max-w-[var(--container-max)]",
        className
      )}
      {...props}
    />
  )
}
