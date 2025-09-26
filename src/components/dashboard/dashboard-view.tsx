'use client';

import { useApp } from '@/contexts/app-context';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { StatCard } from './stat-card';
import { RecentTransactions } from './recent-transactions';

export function DashboardView() {
  const { totalBalance, todayIncome, todayExpenses } = useApp();

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid gap-4 md:grid-cols-3 xl:col-span-3">
        <StatCard title="Total Balance" value={totalBalance} icon={DollarSign} />
        <StatCard
          title="Today's Income"
          value={todayIncome}
          icon={ArrowUpCircle}
          iconClassName="text-green"
        />
        <StatCard
          title="Today's Expenses"
          value={todayExpenses}
          icon={ArrowDownCircle}
          iconClassName="text-red"
        />
      </div>
      <div className="grid gap-4 md:gap-8 xl:col-span-3">
         <RecentTransactions />
      </div>
    </div>
  );
}
