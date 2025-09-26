import type { Transaction } from '@/lib/types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 2000,
    type: 'income',
    category: 'Salary',
    date: today.toISOString(),
    notes: 'Monthly salary',
  },
  {
    id: '2',
    amount: 75.5,
    type: 'expense',
    category: 'Groceries',
    date: today.toISOString(),
    notes: 'Weekly grocery shopping',
  },
  {
    id: '3',
    amount: 12.0,
    type: 'expense',
    category: 'Coffee',
    date: yesterday.toISOString(),
    notes: 'Morning coffee',
  },
  {
    id: '4',
    amount: 50,
    type: 'income',
    category: 'Freelance',
    date: twoDaysAgo.toISOString(),
    notes: 'Logo design project',
  },
  {
    id: '5',
    amount: 250,
    type: 'expense',
    category: 'Utilities',
    date: lastWeek.toISOString(),
    notes: 'Electricity bill',
  },
  {
    id: '6',
    amount: 45,
    type: 'expense',
    category: 'Transport',
    date: yesterday.toISOString(),
    notes: 'Monthly bus pass',
  },
  {
    id: '7',
    amount: 80,
    type: 'expense',
    category: 'Entertainment',
    date: lastWeek.toISOString(),
    notes: 'Movie tickets and snacks',
  },
];
