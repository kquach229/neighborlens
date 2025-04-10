'use client';
// components/GlobalDialog.tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/dialogStore';

export const GlobalDialog = () => {
  const { open, component: Component, props, closeDialog } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
      <DialogContent>
        {Component ? <Component {...props} /> : null}
      </DialogContent>
    </Dialog>
  );
};
