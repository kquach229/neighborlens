import { create } from 'zustand';

interface DialogState {
  open: boolean;
  content: React.ReactNode;
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  content: null,
  openDialog: (content) => set({ open: true, content }),
  closeDialog: () => set({ open: false, content: null }),
}));
