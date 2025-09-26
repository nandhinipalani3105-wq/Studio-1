'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating spending insights based on user transaction data.
 *
 * It includes:
 * - generateSpendingInsights - A function that calls the spending insights flow.
 * - GenerateSpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - GenerateSpendingInsightsOutput - The return type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpendingInsightsInputSchema = z.object({
  transactions: z.array(
    z.object({
      amount: z.number(),
      type: z.enum(['income', 'expense']),
      category: z.string(),
      date: z.string(),
      notes: z.string().optional(),
    })
  ).describe('An array of transaction objects.'),
  totalBalance: z.number().describe('The users total balance (income minus expenses)'),
  todayIncome: z.number().describe('The total income for the current day'),
  todayExpenses: z.number().describe('The total expenses for the current day'),
});
export type GenerateSpendingInsightsInput = z.infer<typeof GenerateSpendingInsightsInputSchema>;

const GenerateSpendingInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights summarizing spending patterns, trends, and potential savings areas.'),
});
export type GenerateSpendingInsightsOutput = z.infer<typeof GenerateSpendingInsightsOutputSchema>;

export async function generateSpendingInsights(input: GenerateSpendingInsightsInput): Promise<GenerateSpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSpendingInsightsPrompt',
  input: {schema: GenerateSpendingInsightsInputSchema},
  output: {schema: GenerateSpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following transaction data and provide insights into the user's spending patterns, identify trends, and suggest potential areas for savings.

Total Balance: {{{totalBalance}}}
Today's Income: {{{todayIncome}}}
Today's Expenses: {{{todayExpenses}}}

Transactions:
{{#each transactions}}
  - Amount: {{{amount}}}, Type: {{{type}}}, Category: {{{category}}}, Date: {{{date}}}, Notes: {{{notes}}}
{{/each}}
`,
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: GenerateSpendingInsightsInputSchema,
    outputSchema: GenerateSpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
