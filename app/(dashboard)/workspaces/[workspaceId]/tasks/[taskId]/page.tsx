import * as React from "react";
import { getCurrent } from "@/features/auth/queries/get-current";
import { redirect } from "next/navigation";
import { TaskIdClient } from "@/app/(dashboard)/workspaces/[workspaceId]/tasks/[taskId]/client";

type TaskIdPageType = {
  params: {
    taskId: string;
  };
};

const TaskIdPage = async ({ params }: TaskIdPageType) => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <TaskIdClient taskId={params.taskId} />;
};

export default TaskIdPage;
