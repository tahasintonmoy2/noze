"use client";

import { Badge } from "@/components/ui/badge";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { snakeCase } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { TaskDate } from "./task-date";
import { Task } from "./types";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status} className="truncate">{snakeCase(status)} </Badge>;
    },
  },
  {
    accessorKey: "assigneeId",
    header: "Member",
    cell: ({ row }) => {
      const assignee = row.original.assignee;

      return (
        <div className="flex items-center gap-x-2">
          <MemberAvatar name={assignee.name} />
          <p className="truncate">{assignee.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "projectId",
    header: "Project",
    cell: ({ row }) => {
      const project = row.original.project;

      return (
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={project.name} />
          <p className="truncate">{project.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Schedule Date",
    cell: ({ row }) => <TaskDate value={row.original.dueDate} />,
  },
  //   {
  //     accessorKey: "createAt",
  //     header: "Date",
  //   },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;
      return <CellAction id={id} projectId={projectId} />;
    },
  },
];
