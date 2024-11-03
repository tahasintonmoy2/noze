import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreateProject } from "@/features/projects/hooks/use-project";
import { ProjectType } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Plus } from "lucide-react";
import { ProjectAvatar } from "./project-avatar";
import {ActionHint} from "@/components/action-hint";

interface ProjectListProps {
  projects: ProjectType[];
  total: number;
}

export const ProjectList = ({ projects, total }: ProjectListProps) => {
  const { open: createProject } = useCreateProject();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({total})</p>
          <ActionHint label="Create an new project">
            <div
                className="flex size-6 cursor-pointer items-center justify-center rounded-md border bg-background"
                onClick={createProject}
            >
              <Plus className="size-4"/>
            </div>
          </ActionHint>
        </div>
        <Separator className="my-4"/>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-4">
          {projects.length === 0 ? (
              <li className="text-sm text-muted-foreground text-center">
              No projects found
            </li>
          ) : (
            <>
              {projects.map((project) => (
                <li key={project.$id}>
                  <a
                    href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                  >
                    <Card className="shadow-none rounded-lg hover:opacity-80 transition mx-2">
                      <CardContent className="flex items-center gap-x-2 p-4">
                        <ProjectAvatar name={project.name} />
                        <p className="mt-[0.2rem] truncate font-medium">
                          {project.name}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
