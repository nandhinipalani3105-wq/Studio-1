import type { Transaction } from '@/lib/types';

// This file is now deprecated as we are fetching data from Firestore.
// It is kept for reference but can be removed.
export const INITIAL_TRANSACTIONS: Omit<Transaction, 'userId'>[] = [];
