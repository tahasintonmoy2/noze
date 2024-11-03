import React from "react";

interface OverviewProps {
  label: string;
  children: React.ReactNode;
}

export const OverviewProperty = ({ label, children }: OverviewProps) => {
  return (
    <div className="flex items-start gap-x-2">
      <div className="min-w-[100px]">
        <h1 className="text-sm text-muted-foreground">{label}</h1>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};
