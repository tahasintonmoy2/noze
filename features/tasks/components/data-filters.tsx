import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Folder, ListCheck, Users } from "lucide-react";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import { TaskStatus } from "./types";
import { Separator } from "@/components/ui/separator";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: loadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: loadingMember } = useGetMembers({
    workspaceId,
  });

  const isLoading = loadingProjects || loadingMember;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  if (isLoading) {
    return (
      <>
        <div className="h-10 px-3 flex items-center rounded-md">
          <div className="loader-lt"></div>
          <p className="ml-2">Loading Filters</p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        value={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheck className="size-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <Separator className="my-2" />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <Users className="size-4 mr-2" />
            <SelectValue placeholder="All Members" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Members</SelectItem>
          <Separator className="my-2" />
          {memberOptions?.map((member) => (
            <>
              <SelectItem value={member.value} key={member.value}>
                <div className="flex items-center gap-x-3">{member.label}</div>
              </SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          value={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full lg:w-auto">
            <div className="flex items-center pr-2">
              <Folder className="size-4 mr-2" />
              <SelectValue placeholder="All Projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <Separator className="my-2" />
            {projectOptions?.map((project) => (
              <>
                <SelectItem value={project.value} key={project.value}>
                  <div className="flex items-center gap-x-3">
                    {project.label}
                  </div>
                </SelectItem>
              </>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        className="h-8 w-full lg:w-auto lg:mt-[0.2rem]"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
        onReset={() => setFilters(null)}
      />
    </div>
  );
};
