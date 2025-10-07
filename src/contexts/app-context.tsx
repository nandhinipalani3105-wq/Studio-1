'use client';

import { createContext, useContext, useMemo, ReactNode, useEffect } from 'react';
import type { Transaction } from '@/lib/types';
import {
  useFirestore,
  useUser,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => void;
  editTransaction: (transaction: Omit<Transaction, 'userId'>) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  todayIncome: number;
  todayExpenses: number;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const firestore = useFirestore();
  const { user } = useUser();

  const transactionsCollection = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'transactions');
  }, [firestore, user]);

  const { data: transactions, isLoading } = useCollection<Transaction>(transactionsCollection);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!transactionsCollection) return;
    const newTransaction = { ...transaction, userId: user!.uid };
    addDocumentNonBlocking(transactionsCollection, newTransaction);
  };

  const editTransaction = (updatedTransaction: Omit<Transaction, 'userId'>) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'transactions', updatedTransaction.id);
    const transactionToUpdate = { ...updatedTransaction, userId: user.uid };
    updateDocumentNonBlocking(docRef, transactionToUpdate);
  };

  const deleteTransaction = (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'transactions', id);
    deleteDocumentNonBlocking(docRef);
  };

  const { totalBalance, todayIncome, todayExpenses } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    let totalBalance = 0;
    let todayIncome = 0;
    let todayExpenses = 0;

    if (!transactions) {
      return { totalBalance, todayIncome, todayExpenses };
    }

    for (const t of transactions) {
      if (t.type === 'Income') {
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
    transactions: transactions || [],
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalBalance,
    todayIncome,
    todayExpenses,
    isLoading,
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
