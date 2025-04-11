'use client';
// components/GlobalDialog.tsx
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/dialogStore';

export const GlobalDialog = () => {
  const { open, component: Component, props, closeDialog } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
      <DialogContent>
        {props?.title && (
          <DialogHeader>
            <h3>{props.title}</h3>
          </DialogHeader>
        )}

        <div className='max-h-[75vh] overflow-y-auto'>
          {Component ? <Component {...props} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
