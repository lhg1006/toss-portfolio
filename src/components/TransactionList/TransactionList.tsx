'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Card } from '@/components/Card';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-1px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  }
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const TransactionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const TransactionDescription = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  letter-spacing: -0.01em;
  line-height: ${theme.typography.lineHeight.normal};
`;

const TransactionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[400]};
  margin-top: ${theme.spacing.xs};
`;

const TransactionCategory = styled.span`
  background-color: ${theme.colors.toss.lightBlue};
  color: ${theme.colors.toss.blue};
  padding: 4px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  letter-spacing: -0.01em;
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const Amount = styled.span<{ type: 'income' | 'expense' }>`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${({ type }) =>
    type === 'income' ? theme.colors.success : theme.colors.gray[900]};
  letter-spacing: -0.02em;
  line-height: ${theme.typography.lineHeight.tight};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const TransactionDate = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[400]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.gray[500]};
`;

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState>거래 내역이 없습니다.</EmptyState>
      </Card>
    );
  }

  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id}>
          <TransactionItem>
            <TransactionInfo>
              <TransactionDescription>{transaction.description}</TransactionDescription>
              <TransactionMeta>
                <TransactionCategory>{transaction.category}</TransactionCategory>
                <span>•</span>
                <span>{formatDate(transaction.date)}</span>
              </TransactionMeta>
            </TransactionInfo>
            <TransactionAmount type={transaction.type}>
              <Amount type={transaction.type}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatAmount(transaction.amount)}
              </Amount>
            </TransactionAmount>
          </TransactionItem>
        </TransactionCard>
      ))}
    </div>
  );
};