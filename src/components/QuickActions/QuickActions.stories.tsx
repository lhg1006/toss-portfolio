import type { Meta, StoryObj } from '@storybook/react';
import { QuickActions } from './QuickActions';

const meta = {
  title: 'Components/QuickActions',
  component: QuickActions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onTransfer: () => console.log('송금 버튼 클릭'),
    onPay: () => console.log('결제 버튼 클릭'),
  },
};

export const MobileView: Story = {
  args: {
    onTransfer: () => console.log('송금 버튼 클릭'),
    onPay: () => console.log('결제 버튼 클릭'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};