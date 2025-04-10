'use client';
// your-dialog.jsx
import * as React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/dialogStore';

export const GlobalDialog = ({ children }) => {
  const { open, openDialog, closeDialog } = useDialogStore();
  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
