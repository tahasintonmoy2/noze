import { create } from "zustand";

type DeleteWorkspaceModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteWSP = create<DeleteWorkspaceModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));