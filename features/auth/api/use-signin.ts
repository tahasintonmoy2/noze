import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Response = InferResponseType<(typeof client.api.auth.signin)["$post"]>;
type Request = InferRequestType<
  (typeof client.api.auth.signin)["$post"]
>["json"];

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signin.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      toast.success("Logged In");
    },
    onError: () => {
      toast.error("Something went wrong! login failed");
    },
  });

  return mutation;
};
