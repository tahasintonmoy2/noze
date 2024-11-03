import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)[":workspaceId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[":workspaceId"]["$delete"]>;

export const useDeleteWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Workspace delete failed");
      }

      return await response.json();
    },
    onSuccess: ({data}) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
      toast.success("Workspace deleted");
    },
    onError: () => {
      toast.error("Something went wrong! workspace delete failed");
    },
  });

  return mutation;
};
