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
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/app-context';

export function TransactionsTable({ transactions }: { transactions: Omit<Transaction, 'userId'>[] }) {
  const [editingTransaction, setEditingTransaction] = useState<Omit<Transaction, 'userId'> | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Omit<Transaction, 'userId'> | null>(null);
  const { isLoading } = useApp();

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
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : transactions.length > 0 ? (
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
                    <Badge
                      variant={t.type === 'Income' ? 'default' : 'destructive'}
                      className={t.type === 'Income' ? 'bg-green hover:bg-green/90' : ''}
                    >
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      t.type === 'Income' ? 'text-green' : 'text-red'
                    }`}
                  >
                    {t.type === 'Income' ? '+' : '-'}
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
