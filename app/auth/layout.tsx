import { cn } from "@/lib/utils";
import { Anta } from "next/font/google";
import React, { ReactNode } from "react";

const textFont = Anta({
  subsets: ["latin"],
  weight: ["400"],
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("h-full flex mt-16 justify-center", textFont.className)}>
      {children}
    </div>
  );
};

export default layout;
