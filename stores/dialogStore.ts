// lib/stores/dialogStore.ts
import { create } from 'zustand';

interface DialogState {
  open: boolean;
  component: React.FC<any> | null;
  props?: any;
  openDialog: (component: React.FC<any>, props?: any) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  component: null,
  props: {},
  openDialog: (component, props = {}) => set({ open: true, component, props }),
  closeDialog: () => set({ open: false, component: null, props: {} }),
}));
