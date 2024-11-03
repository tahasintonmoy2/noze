import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.members)[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.members)[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({ param, json });

      if (!response.ok) {
        throw new Error("Member update failed");
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
