'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useApp } from '@/contexts/app-context';
import type { Transaction } from '@/lib/types';
import { TransactionsTable } from './transactions-table';
import { TransactionsToolbar } from './transactions-toolbar';
import type { DateRange } from 'react-day-picker';

export function TransactionsView() {
  const { transactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const searchMatch =
        searchTerm === '' ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      const date = new Date(t.date);
      const dateMatch =
        !dateRange ||
        !dateRange.from ||
        (date >= dateRange.from && (!dateRange.to || date <= dateRange.to));

      return searchMatch && dateMatch;
    });
  }, [transactions, searchTerm, dateRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
        <CardDescription>View, manage, and filter all your transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TransactionsToolbar
            onSearch={setSearchTerm}
            onDateChange={setDateRange}
            transactions={filteredTransactions}
          />
          <TransactionsTable transactions={filteredTransactions} />
        </div>
      </CardContent>
    </Card>
  );
}
