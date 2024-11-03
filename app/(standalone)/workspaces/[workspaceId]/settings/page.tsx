import { getCurrent } from "@/features/auth/queries/get-current";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { getWorkspace } from "@/features/workspaces/get-workspaces";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettings = async ({ params }: WorkspaceIdSettingsProps) => {
  const user = await getCurrent();

  const initialValues = await getWorkspace({workspaceId: params.workspaceId});

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-96">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettings;
