import { getCurrent } from "@/features/auth/queries/get-current";
import { redirect } from "next/navigation";
import { ProjectIdClient } from "./client";

interface ProjectIdProps {
  params: {
    projectId: string;
  };
}

const ProjectId = async ({ params }: ProjectIdProps) => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <ProjectIdClient projectId={params.projectId} />;
};

export default ProjectId;
