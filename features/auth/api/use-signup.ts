import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Response = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type Request = InferRequestType<
  (typeof client.api.auth.signup)["$post"]
>["json"];

export const useSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signup.$post({ json });

      if (!response.ok) {
        throw new Error(
          "Invalid credentials. Please check the email and password."
        );
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      toast.success("Signed Up");
    },
    onError: () => {
      toast.error("Something went wrong! sign up failed");
    },
  });

  return mutation;
};
