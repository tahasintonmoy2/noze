import { getCurrent } from "@/features/auth/queries/get-current";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/get-workspaces";
import { redirect } from "next/navigation";

interface JoinWorkspaceIdProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}

const JoinWorkspace = async ({ params }: JoinWorkspaceIdProps) => {
  const user = await getCurrent();

  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!initialValues) {
    redirect("/");
  }

  return (
    <div>
      <JoinWorkspaceForm
        initialValues={{
          inviteCode: params.inviteCode,
          name: initialValues.name,
        }}
      />
    </div>
  );
};

export default JoinWorkspace;
