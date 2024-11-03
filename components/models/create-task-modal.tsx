"use client";

import { ResponsiveModel } from "@/components/models/responsive-model";
import { CreateTaskFormWrapper } from "@/features/tasks/components/create-task-form-wrapper";
import { useCreateTask } from "@/features/tasks/hooks/use-create-task";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTask();

  return (
    <ResponsiveModel title="Create task" isOpen={isOpen} onClose={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModel>
  );
};
