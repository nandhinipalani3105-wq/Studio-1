'use client';

import { Header } from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { TransactionsView } from '@/components/transactions/transactions-view';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="dashboard" className="grid gap-4">
          <TabsList className="grid w-full grid-cols-2 md:w-[300px]">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
