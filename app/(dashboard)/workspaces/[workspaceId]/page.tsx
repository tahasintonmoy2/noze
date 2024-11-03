import { getCurrent } from "@/features/auth/queries/get-current";
import { redirect } from "next/navigation";
import { WorkspaceIdClient } from "./client";

const WorkspaceId = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <WorkspaceIdClient />;
};

export default WorkspaceId;
