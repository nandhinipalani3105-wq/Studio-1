export type Transaction = {
  id: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  date: string; // ISO string format
  notes?: string;
  userId: string;
};
