import { ActionHint } from "@/components/action-hint";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MemberType } from "@/features/members/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Settings2 } from "lucide-react";
import { MemberAvatar } from "./member-avatar";

interface MemberListProps {
  members: MemberType[];
  total: number;
}

export const MemberList = ({ members, total }: MemberListProps) => {
  const workspaceId = useWorkspaceId();

  const onNavigateSettings = () =>
    (window.location.href = `/workspaces/${workspaceId}/members`);

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <ActionHint label="Open members settings">
            <div
              className="flex size-6 cursor-pointer items-center justify-center rounded-md border bg-background"
              onClick={onNavigateSettings}
            >
              <Settings2 className="size-4" />
            </div>
          </ActionHint>
        </div>
        <Separator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-4">
          {members.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg overflow-hidden mx-2">
                <CardContent className="flex items-center gap-x-2 p-4">
                  <MemberAvatar name={member.name} />
                  <div className="flex flex-col">
                    <p className="mt-[0.2rem] truncate font-medium">
                      {member.name}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
};
