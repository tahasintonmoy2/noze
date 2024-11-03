"use client";

import { DeleteTaskModal } from "@/components/models/delete-task-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useDeleteTasky } from "@/hooks/use-delete-tasky";
import {
  Edit,
  ExternalLink,
  MoreVertical,
  Trash
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useUpdateTask } from "@/features/tasks/hooks/use-update-task";

interface CellActionProps {
  id: string;
  projectId: string;
}

export const CellAction = ({ id, projectId }: CellActionProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useUpdateTask();
  const { isOpen, onClose, onOpen } = useDeleteTasky();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteTask();

  const onDelete = async () => {
    deleteProject(
      {
        param: { taskId: id },
      },
      {
        onSuccess: () => {
          onClose();
          router.refresh();
        },
      }
    );
  };

  const onOpenTask = () => {
    window.location.href = `/workspaces/${workspaceId}/tasks/${id}`
  }

  const onOpenProject = () => {
    window.location.href = `/workspaces/${workspaceId}/projects/${projectId}`
  }

  return (
    <>
      <DeleteTaskModal
        open={isOpen}
        loading={isDeleting}
        onClose={onClose}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus-visible:ring-transparent focus:outline-none">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onOpenTask}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenProject}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open(id)}>
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:!bg-red-500/40 hover:!text-red-600"
            onClick={onOpen}
          >
            <Trash className="h-4 w-4 mr-2 text-red-600" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
