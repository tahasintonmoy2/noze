import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "@/features/members/utils";
import { ProjectType } from "./types";
import { DATABASE_ID, PROJECTS_ID } from "@/config";

export const getProject = async ({
  projectId
}: {
  projectId: string
}) => {
    const { databases, account } = await createSessionClient();

    const user = await account.get();

    const project = await databases.getDocument<ProjectType>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      throw new Error("Unauthorized");
    }

    return project;
};
