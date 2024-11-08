import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.tasks)["bulk-update"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.tasks)["bulk-update"]["$post"]>;

export const useBulkUpdateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$post"]({ json });

      if (!response.ok) {
        throw new Error("Tasks update failed");
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tasks updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
