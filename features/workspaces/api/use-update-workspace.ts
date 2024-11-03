import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)[":workspaceId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[":workspaceId"]["$patch"]>;

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param });

      if (!response.ok) {
        throw new Error("Workspace update failed");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });

      toast.success("Workspace updated");
    },
    onError: () => {
      toast.error("Something went wrong! workspace update failed");
    },
  });

  return mutation;
};
