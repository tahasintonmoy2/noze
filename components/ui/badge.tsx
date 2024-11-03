import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { TaskStatus } from "@/features/tasks/components/types"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatus.TODO]: "border-transparent bg-primary dark:bg-blue-800 text-blue-400 shadow",
        [TaskStatus.IN_PROGRESS]: "border-transparent bg-indigo-600 dark:text-indigo-400 text-indigo-300 shadow",
        [TaskStatus.IN_REVIEW]: "border-transparent bg-lime-600 text-lime-300 dark:text-lime-400 shadow",
        [TaskStatus.DONE]: "border-transparent dark:bg-green-800 bg-green-600 text-green-400 shadow",
        [TaskStatus.BACKLOG]: "border-transparent bg-violet-800 dark:text-violet-400 text-violet-400 shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
