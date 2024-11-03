"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspace } from "@/hooks/use-model";
import { Plus } from "lucide-react";
import { WorkspaceAvatar } from "./workspace-avatar";
import {ActionHint} from "@/components/action-hint";

export const WorkspaceSwitcher = () => {
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspace();

  const onSelect = (id: string) => {
    window.location.href = `/workspaces/${id}`;
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-muted-foreground">Workspaces</p>
        <ActionHint label="Create workspace" side="left">
          <div
              className="flex size-6 cursor-pointer items-center justify-center rounded-md border bg-background"
              onClick={open}
          >
            <Plus className="size-4"/>
          </div>
        </ActionHint>
      </div>
      {isLoading ? (
          <div className="h-10 px-3 flex items-center rounded-md w-48 bg-slate-200 dark:bg-[#0f0f10]">
            <div className="loader-lt"></div>
            <p className="ml-2">Loading</p>
        </div>
      ) : (
        <Select onValueChange={onSelect} value={workspaceId}>
          <SelectTrigger className="w-full bg-slate-200 dark:bg-[#0f0f10] font-medium p-1 focus-visible:ring-transparent focus-visible:outline-none h-10">
            <SelectValue placeholder="No workspace selected" />
          </SelectTrigger>
          <SelectContent>
            {data?.documents.map((workspace) => (
              <SelectItem key={workspace.$id} value={workspace.$id}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
