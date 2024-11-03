import { AnalyticsResponseType } from "@/features/projects/api/use-get-projects-analytics";
import { AnalyticsCard } from "@/components/analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const Analytics = ({ data }: AnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg lg:w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
        </div>
        <div className="flex items-center flex-1">
          <Separator orientation="vertical" />
          <AnalyticsCard
            title="Assigned tasks"
            value={data.assignedCount}
            variant={data.assignedDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incompleted tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
