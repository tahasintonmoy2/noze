import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.projects)[":projectId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.projects)[":projectId"]["$delete"]>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Project delete failed");
      }

      return await response.json();
    },
    onSuccess: ({data}) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
      toast.success("Project deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
