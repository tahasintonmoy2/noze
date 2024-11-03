"use client";
import { DeleteMemberModal } from "@/components/models/delete-member-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useDeletMemb } from "@/hooks/use-delete-memb";
import { Shield, User, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface MemberActionProps {
  children: React.ReactNode;
  username: string;
  memberId: string;
}

export const MemberAction = ({
  children,
  username,
  memberId,
}: MemberActionProps) => {
  const router = useRouter();
  const { mutate: deleteMember, isPending: deletingMember } = useDeleteMember();
  const { mutate: updateMember, isPending: updatingMember } = useUpdateMember();
  const { isOpen, onOpen, onClose } = useDeletMemb();

  const onRemove = (memberId: string) => {
    deleteMember(
      {
        param: { memberId },
      },
      {
        onSuccess: () => {
          onClose();
          router.refresh();
        },
      }
    );
  };

  const onUpdate = (memberId: string, role: MemberRole) => {
    updateMember(
      {
        param: { memberId },
        json: { role },
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  return (
    <>
      <DeleteMemberModal
        open={isOpen}
        onClose={onClose}
        onConfirm={() => onRemove(memberId)}
        loading={deletingMember}
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus-visible:ring-transparent focus:outline-none"
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl">
          <DropdownMenuItem
            onClick={() => onUpdate(memberId, MemberRole.ADMIN)}
            disabled={updatingMember}
          >
            <Shield className="mr-2 h-4 w-4" />
            Set as Admin
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onUpdate(memberId, MemberRole.MEMBER)}
            disabled={updatingMember}
          >
            <User className="mr-2 h-4 w-4" />
            Set as member
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-3" />
          <DropdownMenuItem
            className="text-red-600 hover:!text-red-600 border-transparent hover:!bg-red-300/70 rounded-md"
            onClick={onOpen}
          >
            <UserMinus className="mr-2 h-4 w-4" />
            <p className="truncate">Remove {username}</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
