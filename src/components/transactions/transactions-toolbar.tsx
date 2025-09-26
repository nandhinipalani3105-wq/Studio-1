'use client';

import { File, ListFilter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCsv } from '@/lib/utils';
import type { Transaction } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import React from 'react';

type TransactionsToolbarProps = {
  onSearch: (term: string) => void;
  onDateChange: (dateRange: DateRange | undefined) => void;
  transactions: Transaction[];
};

export function TransactionsToolbar({
  onSearch,
  onDateChange,
  transactions,
}: TransactionsToolbarProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleExport = () => {
    exportToCsv('transactions.csv', transactions);
  };

  const setDateFilter = (preset: 'today' | 'week' | 'month' | 'all') => {
    const today = new Date();
    let newDate: DateRange | undefined = undefined;
    switch (preset) {
      case 'today':
        newDate = { from: today, to: today };
        break;
      case 'week':
        newDate = { from: addDays(today, -7), to: today };
        break;
      case 'month':
        newDate = { from: addDays(today, -30), to: today };
        break;
      case 'all':
        newDate = undefined;
        break;
    }
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by category or notes..."
          className="w-full rounded-lg bg-background pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              setDate(range);
              onDateChange(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={() => setDateFilter('today')}>
            Today
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => setDateFilter('week')}>
            This Week
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => setDateFilter('month')}>
            This Month
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => setDateFilter('all')}>
            All Time
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="h-10 gap-1" onClick={handleExport}>
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
      </Button>
    </div>
  );
}
