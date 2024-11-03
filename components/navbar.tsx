"use client";

import UserButton from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { ThemeSwitcher } from "./theme-switcher";

const pathnameMap = {
  tasks: {
    title: "Tasks",
    description: "See all of your tasks here",
  },
  projects: {
    title: "Projects",
    description: "See all tasks of your project here",
  },
};

const defaultPathnameMap = {
  title: "Home",
  description: "See all of your projects, tasks and more here",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultPathnameMap;

  return (
    <nav className="fixed z-50 top-0 lg:left-56 left-0 navbar-width px-4 h-14 border-b flex items-center justify-between backdrop-blur">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        {/* <Search /> */}
        <div className="flex flex-col">
          <p className="text-xl">{title}</p>
          <p className="text-sm text-muted-foreground lg:block xl:block hidden">{description}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <div className="md:block hidden">
          {/* {!isPro && (
            <SubscriptionButton isPro={isPro} />
          )} */}
        </div>
        <div className="flex items-center gap-x-2 -mr-4">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
