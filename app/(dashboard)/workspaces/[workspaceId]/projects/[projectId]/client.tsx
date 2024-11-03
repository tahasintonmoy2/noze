"use client";

import Loading from "@/app/loading";
import { Analytics } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-projects-analytics";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { Edit2 } from "lucide-react";
import { notFound } from "next/navigation";

interface ProjectIdProps {
  projectId: string;
}

export const ProjectIdClient = async ({ projectId }: ProjectIdProps) => {
  const { data: project, isLoading: isLoadingProject } = useGetProject({
    projectId,
  });
  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetProjectAnalytics({ projectId });

  const isLoading = isLoadingProject || isLoadingAnalytics;

  if (isLoading) {
    return <Loading />;
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={project.name} className="size-8" />
          <p className="text-xl font-semibold">{project.name}</p>
        </div>
        <a
          href={`/workspaces/${project.workspaceId}/projects/${projectId}/update`}
        >
          <Button variant="teritary">
            <Edit2 className="size-5 mr-2" />
            Edit project
          </Button>
        </a>
      </div>
      {analytics && <Analytics data={analytics} />}
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};
