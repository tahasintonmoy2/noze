import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { ProjectType } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import React from "react";
import { Task, TaskStatus } from "./types";

interface EventCardProps {
  title: string;
  assignee: Task | any;
  project: ProjectType;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-violet-400",
  [TaskStatus.IN_PROGRESS]: "dark:border-l-indigo-400 border-l-indigo-300",
  [TaskStatus.IN_REVIEW]: "border-l-lime-300 dark:border-l-lime-400",
  [TaskStatus.TODO]: "border-l-blue-400",
  [TaskStatus.DONE]: "border-l-green-400",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    window.location.href = `/workspaces/${workspaceId}/tasks/${id}`;
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white dark:bg-[#0a0a0a] text-primary border rounded-md border-l-4 lg:flex flex-col hidden gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p>{title} </p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar
            name={assignee?.name}
            className="size-5"
            fallbackClassName="text-sm"
          />
          <div className="size-1 rounded-full bg-muted dark:bg-[#0f111a]"></div>
          <ProjectAvatar
            name={project.name}
            className="size-5"
            fallbackClassName="text-sm"
          />
        </div>
      </div>
    </div>
  );
};
