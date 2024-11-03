"use client";

import { CreateProjectForm } from "@/features/projects/components/create-project-form";
import { useCreateProject } from "@/features/projects/hooks/use-project";
import { ResponsiveModel } from "./responsive-model";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProject();

  return (
    <ResponsiveModel title="Create project" isOpen={isOpen} onClose={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModel>
  );
};
