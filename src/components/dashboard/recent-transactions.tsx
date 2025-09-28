'use client';
import { useApp } from '@/contexts/app-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

export function RecentTransactions() {
  const { transactions } = useApp();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>A list of your most recent income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((t) => (
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
                    <Badge variant={t.type === 'income' ? 'secondary' : 'destructive'}>
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      t.type === 'income' ? 'text-green' : 'text-red'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </TableCell>
                   <TableCell>{format(new Date(t.date), 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No recent transactions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
