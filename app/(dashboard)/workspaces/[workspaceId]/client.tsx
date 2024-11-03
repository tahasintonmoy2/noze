"use client";

import Loading from "@/app/loading";
import { Analytics } from "@/components/analytics";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberList } from "@/features/members/components/member-list";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectList } from "@/features/projects/components/project-list";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { TaskList } from "@/features/tasks/components/task-list";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { notFound } from "next/navigation";

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) {
    return <Loading />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList tasks={tasks.documents} total={tasks.total} />
        <div className="flex flex-col gap-y-4">
          <ProjectList projects={projects.documents} total={projects.total} />
          <MemberList members={members.documents} total={members.total} />
        </div>
      </div>
    </div>
  );
};
