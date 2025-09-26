'use client';
import { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useApp } from '@/contexts/app-context';
import { generateSpendingInsights } from '@/ai/flows/generate-spending-insights';
import { useToast } from '@/hooks/use-toast';

export function SpendingInsights() {
  const { transactions, totalBalance, todayIncome, todayExpenses } = useApp();
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights('');
    try {
      const result = await generateSpendingInsights({
        transactions,
        totalBalance,
        todayIncome,
        todayExpenses,
      });
      if (result.insights) {
        setInsights(result.insights);
      }
    } catch (error) {
      console.error('Failed to generate insights:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate spending insights. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Spending Insights
        </CardTitle>
        <CardDescription>
          Let AI analyze your spending patterns and provide you with personalized insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : insights ? (
          <div className="prose prose-sm dark:prose-invert text-sm text-muted-foreground whitespace-pre-wrap font-sans">
            {insights}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">
              Click the button to generate your financial insights.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateInsights} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Generating...' : 'Generate Insights'}
        </Button>
      </CardFooter>
    </Card>
  );
}
