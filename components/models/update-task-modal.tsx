"use client";

import { ResponsiveModel } from "@/components/models/responsive-model";
import { UpdateTaskFormWrapper } from "@/features/tasks/components/update-task-form-wrapper";
import { useUpdateTask } from "@/features/tasks/hooks/use-update-task";

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTask();

  return (
    <ResponsiveModel title="Update task" isOpen={!!taskId} onClose={close}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModel>
  );
};
