import { getCurrent } from "@/features/auth/queries/get-current";
import { MembersList } from "@/features/members/components/members-list";
import { redirect } from "next/navigation";
import React from "react";

const WorkspaceIdMembers = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMembers;
