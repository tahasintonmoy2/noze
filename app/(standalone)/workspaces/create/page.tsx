import { getCurrent } from "@/features/auth/queries/get-current";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const WorkspaceCreate = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <div className="flex-col">
        <h1 className="text-xl font-semibold">Create Workspace</h1>
        <CreateWorkspaceForm />
      </div>
    </div>
  );
};

export default WorkspaceCreate;
