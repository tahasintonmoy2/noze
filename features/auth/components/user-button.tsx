"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate } = useLogout();
  const workspaceId = useWorkspaceId();

  const onNavigateSettings = () =>
    (window.location.href = `/workspaces/${workspaceId}/settings`);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-8 w-8 top-0 left-0">
        <div className="loader-lt"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { email, name } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "IU";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm md:pr-2 pl-2 mr-4">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-9 w-9 cursor-pointer border">
              {/* <AvatarImage src={"user?.imageUrl"} /> */}
              <AvatarFallback className="bg-slate-200 dark:bg-background flex items-center justify-center">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-90 dark:bg-background"
        align="end"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 border">
              {/* <AvatarImage src={"user?.imageUrl"} /> */}
              <AvatarFallback className="bg-slate-200 dark:bg-[#0a0a0a] flex items-center justify-center">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs ml-3 font-medium leading-none text-muted-foreground">
              {name}
            </p>
          </div>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {email}
          </p>
        </div>
        <DropdownMenuSeparator className="border border-b" />
        <DropdownMenuItem
          className="w-full flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none"
          onClick={onNavigateSettings}
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full py-0 px-0 flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <Button
            onClick={() => mutate()}
            variant="ghost"
            size="sm"
            className="cursor-default w-full flex items-center justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
