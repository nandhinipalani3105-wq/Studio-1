'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TransactionForm } from './transaction-form';
import type { Transaction } from '@/lib/types';

type TransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction;
};

export function TransactionDialog({ open, onOpenChange, transaction }: TransactionDialogProps) {
  const isEditing = !!transaction;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the details of your transaction.'
              : 'Enter the details of your new income or expense.'}
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          transaction={transaction}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
