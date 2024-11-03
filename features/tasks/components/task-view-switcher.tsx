"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { DataKanban } from "@/features/tasks/components/data-kanban";
import { TaskStatus } from "@/features/tasks/components/types";
import { useCreateTask } from "@/features/tasks/hooks/use-create-task";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Calendar, Plus, StretchVertical } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useBulkUpdateTask } from "../api/use-bulk-update-task";
import { columns } from "./columns";
import { DataCalendar } from "./data-calendar";
import { DataFilters } from "./data-filters";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({hideProjectFilter}: TaskViewSwitcherProps) => {
  const { open } = useCreateTask();
  const workspaceId = useWorkspaceId();
  const defaultProjectId = useProjectId();
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const { data: task, isLoading } = useGetTasks({
    workspaceId,
    status,
    assigneeId,
    projectId: defaultProjectId || projectId,
    dueDate,
  });

  const { mutate: bulkUpdate } = useBulkUpdateTask();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="lg:w-auto w-full"
    >
      <div className="flex-1 w-full border rounded-lg">
        <div className="h-full flex flex-col overflow-auto p-4">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger value="table">
                <MdOutlineSpaceDashboard className="size-5 mr-2" />
                Table
              </TabsTrigger>
              <TabsTrigger value="kanban">
                <StretchVertical className="size-4 mr-2" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="size-4 mr-2" />
                Calendar
              </TabsTrigger>
            </TabsList>
            <Button className="lg:w-auto w-full" onClick={open}>
              <Plus className="size-5 mr-2" />
              Create
            </Button>
          </div>
          <Separator className="my-4" />
          <DataFilters hideProjectFilter={hideProjectFilter}/>
          <Separator className="mt-4" />
          {isLoading ? (
            <div className="h-20 flex items-center justify-center rounded-md">
              <div className="loader-lt"></div>
              <p className="ml-2">Loading</p>
            </div>
          ) : (
            <>
              <TabsContent value="table">
                <DataTable
                  columns={columns}
                  data={task?.documents ?? []}
                  searchKey="name"
                />
              </TabsContent>
              <TabsContent value="kanban">
                <DataKanban
                  data={task?.documents ?? []}
                  onChange={onKanbanChange}
                />
              </TabsContent>
              <TabsContent value="calendar">
                <DataCalendar data={task?.documents ?? []} />
              </TabsContent>
            </>
          )}
        </div>
      </div>
    </Tabs>
  );
};
