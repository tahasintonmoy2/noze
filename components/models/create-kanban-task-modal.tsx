"use client";

import { ResponsiveModel } from "@/components/models/responsive-model";
import { CreateKanbanTaskFormWrapper } from "@/features/tasks/components/create-kanban-task-form-wrapper";
import { useKanbanTaskStatus } from "@/features/tasks/hooks/use-kanban-task-status";

export const CreateKanbanTaskModal = () => {
  const { taskStatus, close } = useKanbanTaskStatus();

  return (
    <ResponsiveModel title="Create task" isOpen={!!taskStatus} onClose={close}>
      {taskStatus && <CreateKanbanTaskFormWrapper status={taskStatus} onCancel={close} />}
    </ResponsiveModel>
  );
};
