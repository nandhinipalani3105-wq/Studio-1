import { TrendingUp } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <TrendingUp className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold">ExpenseFlow</span>
    </div>
  );
}
