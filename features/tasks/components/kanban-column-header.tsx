import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/features/tasks/components/types";
import { useKanbanTaskStatus } from "@/features/tasks/hooks/use-kanban-task-status";
import { snakeCase } from "@/lib/utils";
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  Plus,
} from "lucide-react";
import * as React from "react";
import {ActionHint} from "@/components/action-hint";

type KanbanColumnHeaderType = {
  board: TaskStatus;
  taskCount: number;
};

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashed className="size-[18px] text-violet-400" />
  ),
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashed className="size-[18px] dark:text-indigo-400 text-indigo-300" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDot className="size-[18px] text-lime-300 dark:text-lime-400" />
  ),
  [TaskStatus.TODO]: <Circle className="size-[18px] text-blue-400" />,
  [TaskStatus.DONE]: <CircleCheck className="size-[18px] text-green-400" />,
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderType) => {
  const icon = statusIconMap[board];
  const { open } = useKanbanTaskStatus();

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2>{snakeCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-slate-200 dark:bg-[#0f0f10] dark:text-white font-medium">
          {taskCount}
        </div>
      </div>
      <ActionHint label="Create an new task">
        <Button
            variant="ghost"
            size="icon"
            className="size-5"
            onClick={() => open(board)}
        >
          <Plus className="size-4 dark:text-white" />
        </Button>
      </ActionHint>
    </div>
  );
};
