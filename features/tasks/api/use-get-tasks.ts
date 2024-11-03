import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../components/types";

interface useGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
  status?: TaskStatus | null;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  assigneeId,
  dueDate,
  search,
  status,
}: useGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      dueDate,
      status,
      search,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
