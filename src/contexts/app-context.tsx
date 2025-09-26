'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import type { Transaction } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { INITIAL_TRANSACTIONS } from '@/lib/data';

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  todayIncome: number;
  todayExpenses: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    'transactions',
    INITIAL_TRANSACTIONS
  );

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const { totalBalance, todayIncome, todayExpenses } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    let totalBalance = 0;
    let todayIncome = 0;
    let todayExpenses = 0;

    for (const t of transactions) {
      if (t.type === 'income') {
        totalBalance += t.amount;
        if (t.date.startsWith(today)) {
          todayIncome += t.amount;
        }
      } else {
        totalBalance -= t.amount;
        if (t.date.startsWith(today)) {
          todayExpenses += t.amount;
        }
      }
    }
    return { totalBalance, todayIncome, todayExpenses };
  }, [transactions]);

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalBalance,
    todayIncome,
    todayExpenses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
