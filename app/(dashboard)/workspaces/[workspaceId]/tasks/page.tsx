import { getCurrent } from "@/features/auth/queries/get-current";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { redirect } from "next/navigation";
import React from "react";

const TasksPage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher />
    </div>
  );
};

export default TasksPage;
