"use client";

import Loading from "@/app/loading";
import { Separator } from "@/components/ui/separator";
import { ProjectType } from "@/features/projects/types";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { notFound } from "next/navigation";

type TaskIdClientType = {
  taskId: string;
};

export const TaskIdClient = ({ taskId }: TaskIdClientType) => {
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs task={data} project={data.project as ProjectType} />
      <Separator className="my-4"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};
