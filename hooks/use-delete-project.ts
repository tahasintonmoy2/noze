import { create } from "zustand";

type DeleteProjectModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteWSP = create<DeleteProjectModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
