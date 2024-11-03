"use server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { WorkspaceType } from "./types";

export const getWorkspaces = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return workspaces;
  } catch (error) {
    return { documents: [], total: 0 };
  }
};

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const { databases, account } = await createSessionClient();

    const user = await account.get();

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) {
      throw new Error("Unauthorized");
    }

    const workspace = await databases.getDocument<WorkspaceType>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return workspace;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getWorkspaceInfo = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const { databases } = await createSessionClient();

    const workspace = await databases.getDocument<WorkspaceType>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return {
      name: workspace.name,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
