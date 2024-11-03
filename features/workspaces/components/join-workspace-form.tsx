"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
    inviteCode: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();

  const onJoinWorkspace = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: initialValues.inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          window.location.href = `/workspaces/${data.$id}`;
        },
      }
    );
  };

  return (
    <Card className="w-96 h-full shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
          workspace
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter className="flex items-center justify-between mt-4">
        <a href="/">
          <Button variant="destructive">Decline</Button>
        </a>
        <Button onClick={onJoinWorkspace} disabled={isPending}>
          {isPending ? (
            <div className="flex items-center">
              <div className="loader"></div>
              <p className="text-white">Joining</p>
            </div>
          ) : (
            <>
              <p className="text-white">Join workspace</p>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
