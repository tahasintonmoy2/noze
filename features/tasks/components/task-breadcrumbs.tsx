import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { ProjectType } from "@/features/projects/types";
import { Task } from "@/features/tasks/components/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type TaskBreadcrumbsType = {
  project: ProjectType;
  task: Task;
};

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsType) => {
  const workspaceId = useWorkspaceId();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/workspaces/${workspaceId}`}
            className="flex items-center"
          >
            <ProjectAvatar name={project.name} />
            <p className="ml-2">Workspaces</p>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/workspaces/${workspaceId}/tasks`}>
            Tasks
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{task?.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
