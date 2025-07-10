import type { Meta, StoryObj } from '@storybook/react';
import { AccountCard } from './AccountCard';
import { ToastProvider } from '@/hooks/useToast';

const meta = {
  title: 'Components/AccountCard',
  component: AccountCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cardColor: {
      control: { type: 'select' },
      options: ['blue', 'purple', 'green', 'orange'],
    },
    balance: {
      control: { type: 'number' },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof AccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accountName: '토스뱅크 입출금',
    accountNumber: '100012345678',
    balance: 1250000,
    cardColor: 'blue',
  },
};

export const SavingsAccount: Story = {
  args: {
    accountName: '토스뱅크 적금',
    accountNumber: '200012345678',
    balance: 5000000,
    cardColor: 'green',
  },
};

export const VIPAccount: Story = {
  args: {
    accountName: '토스뱅크 VIP',
    accountNumber: '300012345678',
    balance: 99999999,
    cardColor: 'purple',
  },
};

export const YoungAccount: Story = {
  args: {
    accountName: '토스뱅크 청년통장',
    accountNumber: '400012345678',
    balance: 50000,
    cardColor: 'orange',
  },
};