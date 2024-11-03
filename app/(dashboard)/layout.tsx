import { CreateKanbanTaskModal } from "@/components/models/create-kanban-task-modal";
import { CreateProjectModal } from "@/components/models/create-project-modal";
import { CreateTaskModal } from "@/components/models/create-task-modal";
import { CreateWorkspaceModal } from "@/components/models/create-workspace-modal";
import { UpdateTaskModal } from "@/components/models/update-task-modal";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">
        <CreateWorkspaceModal />
        <CreateProjectModal />
        <CreateTaskModal />
        <CreateKanbanTaskModal />
        <UpdateTaskModal />
        <div className="flex w-full h-full">
          <div className="fixed left-0 top-0 hidden lg:block lg:w-56 h-full overflow-y-auto">
            <Sidebar />
          </div>
          <div className="lg:pl-56 w-screen overflow-hidden">
            <div className="mx-auto max-w-screen-2xl h-full">
              <Navbar />
              <main className="h-full py-8 px-6 mt-10 flex flex-col">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
