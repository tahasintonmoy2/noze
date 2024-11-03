"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, XCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col justify-center text-center max-w-96 items-center font-medium p-2 border text-red-700 border-red-500 bg-red-800/35 rounded-sm mb-4">
        <XCircle className="h-6 w-6" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p>This page can&apos;t load. Please try again.</p>
      </div>
      <a href="/">
        <Button>
          <ChevronLeft className="size-5 mr-1" />
          Return Home
        </Button>
      </a>
    </div>
  );
};

export default Error;
