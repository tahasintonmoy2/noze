"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useUpdateTask } from "@/features/tasks/hooks/use-update-task";
import { snakeCase } from "@/lib/utils";
import { Edit } from "lucide-react";
import { OverviewProperty } from "./overview-props";
import { TaskDate } from "./task-date";
import { Task } from "./types";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useUpdateTask();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted dark:bg-[#0a0a0a] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Overview</h1>
          <button onClick={() => open(task.$id)} className="flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>{snakeCase(task.status)}</Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};
