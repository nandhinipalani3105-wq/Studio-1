import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/app-context';

type StatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
};

export function StatCard({ title, value, icon: Icon, iconClassName }: StatCardProps) {
  const { isLoading } = useApp();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-4 w-4 text-muted-foreground', iconClassName)} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <div className="text-2xl font-bold">{formatCurrency(value)}</div>
        )}
      </CardContent>
    </Card>
  );
}
