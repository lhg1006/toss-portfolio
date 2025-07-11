'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

const TransactionCard = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: ${theme.effects.transition};
  
  &:hover {
    box-shadow: ${theme.shadows.toss.button};
    transform: translateY(-2px);
    background: ${theme.colors.white};
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
  font-weight: ${theme.typography.fontWeight.bold};
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
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: -0.01em;
  border: 1px solid rgba(49, 130, 246, 0.2);
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const Amount = styled.span<{ type: 'income' | 'expense' }>`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: normal;
  color: ${({ type }) =>
    type === 'income' ? theme.colors.success : theme.colors.gray[900]};
  letter-spacing: -0.02em;
  line-height: ${theme.typography.lineHeight.tight};
  font-variant-numeric: tabular-nums;
  
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

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.sm};
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray[100]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.gray[700]};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  margin-top: ${theme.spacing.md};
  
  &:hover {
    background: ${theme.colors.gray[200]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfiniteScrollContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: 3px;
    
    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }
`;

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onLoadMore, 
  hasMore = false, 
  loading = false 
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersect]);
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
    <InfiniteScrollContainer>
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
      
      {loading && (
        <LoadingIndicator>
          거래 내역을 불러오는 중...
        </LoadingIndicator>
      )}
      
      {hasMore && !loading && onLoadMore && (
        <LoadMoreButton onClick={onLoadMore}>
          더 보기
        </LoadMoreButton>
      )}
      
      {onLoadMore && (
        <div ref={observerRef} style={{ height: '20px' }} />
      )}
    </InfiniteScrollContainer>
  );
};