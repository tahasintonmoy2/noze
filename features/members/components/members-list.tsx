"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { MoreVertical } from "lucide-react";
import { Fragment } from "react";
import { MdArrowBack } from "react-icons/md";
import { MemberAction } from "./member-action";
import { MemberAvatar } from "./member-avatar";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetMembers({ workspaceId });

  return (
    <Card className="w-96 h-full shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-4">
          <a href={`/workspaces/${workspaceId}`}>
            <Button variant="secondary">
              <MdArrowBack className="size-4 mr-2" />
              Back
            </Button>
          </a>
          <p>Members</p>
        </CardTitle>
        <CardDescription>Manage members.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        {isLoading ? (
           <div className="h-10 px-3 flex items-center rounded-md">
             <div className="loader-lt"></div>
             <p className="ml-2">Loading Members</p>
           </div>
        ) : (
           <>
             {data?.documents.map((member, idx) => (
                <Fragment key={member.$id}>
                  <div className="flex items-center gap-2 mt-3">
                    <MemberAvatar name={member.name} className="size-10" />
                    <div className="flex-col">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <MemberAction username={member.name} memberId={member.$id}>
                      <button className="ml-auto">
                        <MoreVertical className="size-5" />
                      </button>
                    </MemberAction>
                  </div>
                  {idx < data.documents.length - 1 && (
                     <Separator className="my-2.5" />
                  )}
                </Fragment>
             ))}
           </>
        )}
      </CardContent>
    </Card>
  );
};
