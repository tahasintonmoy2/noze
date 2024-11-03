import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface ActionHintProps {
  children: React.ReactNode;
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  asChild?: boolean;
  className?: string;
}

export const ActionHint = ({
  children,
  label,
  side = "right",
  sideOffset = 6,
  asChild,
  className,
}: ActionHintProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
          <TooltipContent
            side={side}
            sideOffset={sideOffset}
            className={cn(
              "dark:bg-background dark:border bg-white text-black border dark:text-white font-semibold",
              className
            )}
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
