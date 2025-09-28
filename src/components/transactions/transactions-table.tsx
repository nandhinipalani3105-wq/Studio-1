'use client';

import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { TransactionDialog } from './transaction-dialog';
import { DeleteTransactionDialog } from './delete-transaction-dialog';

export function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="font-medium">{t.category}</div>
                    {t.notes && (
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {t.notes}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={t.type === 'income' ? 'secondary' : 'destructive'}>
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      t.type === 'income' ? 'text-green' : 'text-red'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell>{format(new Date(t.date), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingTransaction(t)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red"
                          onClick={() => setDeletingTransaction(t)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {editingTransaction && (
        <TransactionDialog
          open={!!editingTransaction}
          onOpenChange={(isOpen) => !isOpen && setEditingTransaction(null)}
          transaction={editingTransaction}
        />
      )}
      {deletingTransaction && (
        <DeleteTransactionDialog
          open={!!deletingTransaction}
          onOpenChange={(isOpen) => !isOpen && setDeletingTransaction(null)}
          transaction={deletingTransaction}
        />
      )}
    </>
  );
}
