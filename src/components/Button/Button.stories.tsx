import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '송금하기',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '결제하기',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '충전하기',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: '작은 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '큰 버튼',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성 버튼',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
  },
};