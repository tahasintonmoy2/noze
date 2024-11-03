"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  onReset?: () => void;
  className?: string;
}

export const DatePicker = ({ value, onChange, onReset, className }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : <span>Select an date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
        <Button className="w-52 mb-3" disabled={!value} onClick={onReset}>
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
