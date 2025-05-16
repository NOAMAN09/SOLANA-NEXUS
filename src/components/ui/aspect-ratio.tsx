
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string
  gradient?: boolean
  glow?: boolean
  children?: ReactNode
}

const AspectRatio = ({
  className,
  gradient,
  glow,
  children,
  ...props
}: AspectRatioProps) => (
  <div className={cn(
    "overflow-hidden rounded-lg",
    gradient && "bg-gradient-to-br from-solana-primary/20 to-solana-secondary/20",
    glow && "shadow-glow-sm",
    className
  )}>
    <AspectRatioPrimitive.Root {...props}>
      {children}
    </AspectRatioPrimitive.Root>
  </div>
)

export { AspectRatio }
