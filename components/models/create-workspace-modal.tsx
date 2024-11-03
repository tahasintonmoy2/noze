"use client";

import { useCreateWorkspace } from "@/hooks/use-model";
import { ResponsiveModel } from "./responsive-model";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspace();

  return (
    <ResponsiveModel title="Create workspace" isOpen={isOpen} onClose={setIsOpen}>
      <CreateWorkspaceForm onCancel={() => setIsOpen(false)} />
    </ResponsiveModel>
  );
};
