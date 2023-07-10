import { create } from "zustand";

interface useStoreModalstore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalstore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
