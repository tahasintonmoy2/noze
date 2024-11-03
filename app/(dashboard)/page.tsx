import { getCurrent } from "@/features/auth/queries/get-current";
import { getWorkspaces } from "@/features/workspaces/get-workspaces";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  const workspaces = await getWorkspaces();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
