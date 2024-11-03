import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import UserButton from "@/features/auth/components/user-button";
import React from "react";

const StandAlonelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-100 dark:bg-[#0f0f10] min-h-screen">
      <nav className="flex justify-between items-center h-16 w-full fixed backdrop-blur-md border-b z-50 px-4">
        <div className="flex items-center gap-x-4">
          <Logo href="/" />
          <p className="text-slate-400 text-lg">Workspace</p>
        </div>
        <div className="flex items-center gap-x-2 -mr-4">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
      <div className="mx-auto max-w-screen-2xl p-4">
        <main className="flex flex-col items-center justify-center mt-14 py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StandAlonelayout;
