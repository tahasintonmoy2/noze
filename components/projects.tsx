"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProject } from "@/features/projects/hooks/use-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import {ActionHint} from "@/components/action-hint";

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProject();
  const { data, isLoading } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs uppercase text-muted-foreground">Projects</p>
        <ActionHint label="Create project" side="left">
          <div
             className="flex size-6 cursor-pointer items-center justify-center rounded-md border bg-background"
             onClick={open}
          >
            <Plus className="size-4"/>
          </div>
        </ActionHint>
      </div>
      {isLoading ? (
         <div className="h-10 px-3 flex items-center rounded-md">
           <div className="loader-lt"></div>
           <p className="ml-2">Loading Projects</p>
         </div>
      ) : (
        <>
          {data?.documents.length === 0 ? (
            <span className="truncate text-muted-foreground">No projects</span>
          ) : (
            <>
              {data?.documents.map((project) => {
                const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
                const isActive = pathname === href;

                return (
                  <a href={href} key={project.$id}>
                    <div
                      className={cn(
                        "flex items-center gap-y-2 gap-x-2.5 p-[0.3rem] rounded-md transition cursor-pointer text-slate-600 dark:hover:text-white",
                        isActive
                          ? "bg-blue-200 dark:bg-[#1f1f22] dark:text-white text-blue-600 shadow-sm opacity-100"
                          : "hover:bg-slate-200 dark:hover:bg-[#1f1f22]"
                      )}
                    >
                      <ProjectAvatar name={project.name} />
                      <span className="truncate">{project.name}</span>
                    </div>
                  </a>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};
