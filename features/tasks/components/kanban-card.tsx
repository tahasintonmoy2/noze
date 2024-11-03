import { Separator } from "@/components/ui/separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { CellAction } from "./cell-action";
import { TaskDate } from "./task-date";
import { Task } from "./types";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white dark:bg-[#0f111a] p-2.5 mb-1.5 rounded w-[11.7rem] shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2"> {task.name}</p>
        <CellAction id={task.$id} projectId={task.projectId} />
      </div>
      <Separator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          className="size-6 rounded-full"
          fallbackClassName="text-sm"
        />
        <p className="truncate">{task.assignee.name}</p>
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          className="size-6 rounded-full"
          fallbackClassName="text-sm"
        />
        <p>{task.project.name}</p>
      </div>
      <TaskDate value={task.dueDate} className="text-sm" />
    </div>
  );
};
