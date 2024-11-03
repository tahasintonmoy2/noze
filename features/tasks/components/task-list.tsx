import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/features/tasks/components/types";
import { useCreateTask } from "@/features/tasks/hooks/use-create-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Plus } from "lucide-react";
import {ActionHint} from "@/components/action-hint";

interface TaskListProps {
  tasks: Task[];
  total: number;
}

export const TaskList = ({ tasks, total }: TaskListProps) => {
  const { open: createTask } = useCreateTask();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <ActionHint label="Create an new task">
            <div
                className="flex size-6 cursor-pointer items-center justify-center rounded-md border bg-background"
                onClick={createTask}
            >
              <Plus className="size-4"/>
            </div>
          </ActionHint>
        </div>
        <Separator className="my-4"/>
        {tasks.length === 0 ? (
            <>
              <p className="text-sm text-muted-foreground text-center">
                No tasks found
              </p>
            </>
        ) : (
          <>
            <ul className="flex flex-col gap-y-4">
              {tasks.map((task) => (
                <li key={task.$id}>
                  <a href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                    <Card className="shadow-none rounded-lg hover:opacity-80 transition">
                      <CardHeader className="pl-4 py-2">
                        <CardTitle className="truncate">{task.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pl-4 pb-2">
                        <div className="flex items-center gap-x-2">
                          <p>{task.project?.name}</p>
                          <div className="size-1 rounded-full bg-slate-300"></div>
                          <div className="text-muted-foreground flex items-center">
                            <Calendar className="size-4 mr-2" />
                            <span className="truncate pt-[0.4rem]">
                              {formatDistanceToNow(new Date(task.dueDate))}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </li>
              ))}
            </ul>
            <a href={`/workspaces/${workspaceId}/tasks`}>
              <Button variant="teritary" className="mt-4 lg:w-auto w-full">
                Show All
              </Button>
            </a>
          </>
        )}
      </div>
    </div>
  );
};
