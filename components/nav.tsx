"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

const routes = [
  {
    label: "Dashboard",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: MdCheckCircleOutline,
    activeIcon: MdCheckCircle,
  },
  {
    label: "Members",
    href: "/members",
    icon: Users,
    activeIcon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    activeIcon: Settings,
  },
];

export const Nav = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col w-full mb-4">
      {routes.map((route) => {
        const flHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive = pathname === flHref;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <a key={route.href} href={flHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 mb-[0.4rem] rounded-md text-sm font-[500] group transition-all",
                isActive
                  ? "bg-blue-200 dark:bg-[#1f1f22] dark:text-white text-blue-600 shadow-sm opacity-100"
                  : "hover:bg-slate-200 dark:hover:bg-[#1f1f22] text-slate-600"
              )}
            >
              <Icon
                className={cn(
                  "size-5 text-slate-500",
                  isActive ? "text-blue-600 dark:text-white" : "text-muted-foreground"
                )}
              />
              {route.label}
            </div>
          </a>
        );
      })}
    </div>
  );
};
