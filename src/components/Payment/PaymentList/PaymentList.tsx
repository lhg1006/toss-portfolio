'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Payment } from '@/app/pay/page';
import { PaymentDetail } from '../PaymentDetail';

interface PaymentListProps {
  payments: Payment[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

const PaymentCard = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: ${theme.effects.transition};
  cursor: pointer;
  
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

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const PaymentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const PaymentMerchant = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  letter-spacing: -0.01em;
  line-height: ${theme.typography.lineHeight.normal};
`;

const PaymentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[400]};
  margin-top: ${theme.spacing.xs};
  flex-wrap: wrap;
`;

const PaymentCategory = styled.span<{ category: string }>`
  background-color: ${({ category }) => {
    const colors = {
      '카페': '#fff3e0',
      '식당': '#ffebee', 
      '쇼핑': '#f3e5f5',
      '온라인쇼핑': '#e3f2fd',
      '교통': '#e8f5e8',
      '의료': '#fce4ec',
      '문화': '#fff8e1',
    };
    return colors[category as keyof typeof colors] || theme.colors.gray[100];
  }};
  color: ${({ category }) => {
    const colors = {
      '카페': '#ff9500',
      '식당': '#ff6b6b', 
      '쇼핑': '#8b5cf6',
      '온라인쇼핑': '#3182f6',
      '교통': '#00c896',
      '의료': '#f472b6',
      '문화': '#fbbf24',
    };
    return colors[category as keyof typeof colors] || theme.colors.gray[600];
  }};
  padding: 4px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: -0.01em;
  border: 1px solid ${({ category }) => {
    const colors = {
      '카페': '#ff9500',
      '식당': '#ff6b6b', 
      '쇼핑': '#8b5cf6',
      '온라인쇼핑': '#3182f6',
      '교통': '#00c896',
      '의료': '#f472b6',
      '문화': '#fbbf24',
    };
    return colors[category as keyof typeof colors] || theme.colors.gray[300];
  }}20;
`;

const PaymentMethod = styled.span`
  padding: 2px ${theme.spacing.xs};
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[600]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const PaymentAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const Amount = styled.span`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: normal;
  color: ${theme.colors.gray[900]};
  letter-spacing: -0.01em;
  line-height: ${theme.typography.lineHeight.tight};
  font-variant-numeric: tabular-nums;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const PaymentDate = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[400]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const InstallmentBadge = styled.span`
  background: ${theme.colors.toss.lightBlue};
  color: ${theme.colors.toss.blue};
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.gray[500]};
  background: ${theme.colors.backgrounds.glassBlur};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
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

export const PaymentList: React.FC<PaymentListProps> = ({ 
  payments, 
  onLoadMore, 
  hasMore = false, 
  loading = false 
}) => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
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

  if (payments.length === 0) {
    return (
      <EmptyState>결제 내역이 없습니다.</EmptyState>
    );
  }

  return (
    <>
      <InfiniteScrollContainer>
        {payments.map((payment) => (
          <PaymentCard 
            key={payment.id}
            onClick={() => setSelectedPayment(payment)}
          >
            <PaymentItem>
              <PaymentInfo>
                <PaymentMerchant>{payment.merchant}</PaymentMerchant>
                <PaymentMeta>
                  <PaymentCategory category={payment.category}>
                    {payment.category}
                  </PaymentCategory>
                  <span>•</span>
                  <PaymentMethod>{payment.paymentMethod}</PaymentMethod>
                  {payment.installment && payment.installment > 0 && (
                    <>
                      <span>•</span>
                      <InstallmentBadge>{payment.installment}개월</InstallmentBadge>
                    </>
                  )}
                  <span>•</span>
                  <span>{formatDate(payment.date)}</span>
                </PaymentMeta>
                {payment.location && (
                  <PaymentMeta>
                    <span>📍 {payment.location}</span>
                  </PaymentMeta>
                )}
              </PaymentInfo>
              <PaymentAmount>
                <Amount>-{formatAmount(payment.amount)}</Amount>
              </PaymentAmount>
            </PaymentItem>
          </PaymentCard>
        ))}
        
        {loading && (
          <LoadingIndicator>
            결제 내역을 불러오는 중...
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

      {selectedPayment && (
        <PaymentDetail 
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </>
  );
};