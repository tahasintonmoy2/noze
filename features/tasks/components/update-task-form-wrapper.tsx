import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { UpdateTaskForm } from "./update-task-form";

interface UpdateTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const UpdateTaskFormWrapper = ({
  onCancel,
  id,
}: UpdateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

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

  const loading = isLoading || isPendingProject || isLoadingTask;

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

  if (!initialValues) {
    return null;
  }

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      initialValues={initialValues}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
