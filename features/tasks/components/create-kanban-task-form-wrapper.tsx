import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { CreateKanbanTaskForm } from "./create-kanban-task-form";
import { TaskStatus } from "./types";

interface UpdateTaskFormWrapperProps {
  onCancel: () => void;
  status: TaskStatus;
}

export const CreateKanbanTaskFormWrapper = ({
  onCancel,
  status,
}: UpdateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isPendingProject } = useGetProjects({
    workspaceId,
  });

  const {
    data: members,
    isPending: isPendingMember,
    isLoading,
  } = useGetMembers({ workspaceId });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const loading = isLoading || isPendingProject;

  if (loading) {
    return (
      <Card className="w-full h-20 border-none shadow-none">
        <CardContent className="flex items-center justify-center gap-x-3 h-full">
          <div className="loader-lt"></div>
          <p>Loading</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateKanbanTaskForm
      onCancel={onCancel}
      initialStatus={status}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
