import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList, type Transaction } from './TransactionList';

const meta = {
  title: 'Components/TransactionList',
  component: TransactionList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income' as const,
    amount: 50000,
    description: '카카오페이 충전',
    date: new Date('2024-07-07T14:30:00'),
    category: '충전',
  },
  {
    id: '2',
    type: 'expense' as const,
    amount: 12000,
    description: '스타벅스 아메리카노',
    date: new Date('2024-07-07T09:15:00'),
    category: '카페',
  },
  {
    id: '3',
    type: 'expense' as const,
    amount: 8500,
    description: '지하철 교통비',
    date: new Date('2024-07-06T18:45:00'),
    category: '교통',
  },
  {
    id: '4',
    type: 'income' as const,
    amount: 2500000,
    description: '월급',
    date: new Date('2024-07-05T10:00:00'),
    category: '급여',
  },
];

export const Default: Story = {
  args: {
    transactions: sampleTransactions,
  },
};

export const EmptyState: Story = {
  args: {
    transactions: [],
  },
};

export const IncomeOnly: Story = {
  args: {
    transactions: sampleTransactions.filter(t => t.type === 'income'),
  },
};

export const ExpenseOnly: Story = {
  args: {
    transactions: sampleTransactions.filter(t => t.type === 'expense'),
  },
};