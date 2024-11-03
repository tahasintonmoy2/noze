import { Button } from "@/components/ui/button";
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "./data-calendar.css";
import { EventCard } from "./event-card";
import { Task } from "./types";

interface DataCalendarProps {
  data: Task[];
}

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const locales = {
  "es-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="flex items-center mb-4 w-full lg:w-auto justify-center lg:justify-start">
      <Button
        variant="outline"
        className="flex items-center mr-2"
        size="icon"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="border flex items-center border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
        <CalendarIcon className="size-4 mr-2" />
        <p className="text-sm">{format(date, "MMMM, yyyy")}</p>
      </div>
      <Button
        variant="outline"
        className="flex items-center ml-2"
        size="icon"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      showAllEvents
      toolbar
      className="h-screen"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),
        toolbar: () => (
          <CustomToolbar date={value} onNavigate={handleNavigate} />
        ),
      }}
    />
  );
};
