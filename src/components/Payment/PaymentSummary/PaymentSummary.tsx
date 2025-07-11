'use client';

import { useMemo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Payment } from '@/app/pay/page';

interface PaymentSummaryProps {
  payments: Payment[];
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SummaryCard = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: ${theme.effects.transition};
  animation: ${fadeIn} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.toss.float};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[600]};
  margin: 0 0 ${theme.spacing.sm} 0;
  letter-spacing: -0.01em;
`;

const CardValue = styled.div`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: normal;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const CardSubtext = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[500]};
  margin: 0;
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.5);
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.effects.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const CategoryName = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
`;

const CategoryAmount = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  font-variant-numeric: tabular-nums;
`;

const CategoryBar = styled.div<{ percentage: number; color: string }>`
  width: 100%;
  height: 8px;
  background: ${theme.colors.gray[200]};
  border-radius: 4px;
  overflow: hidden;
  margin-top: ${theme.spacing.xs};
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.percentage}%;
    height: 100%;
    background: ${props => props.color};
    border-radius: 4px;
    transition: width 0.6s ease-out;
  }
`;

const PaymentMethodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const PaymentMethodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xs} 0;
`;

const PaymentMethodName = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
`;

const PaymentMethodCount = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[800]};
`;

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ payments }) => {
  const summary = useMemo(() => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalCount = payments.length;
    const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;
    
    // 카테고리별 집계
    const categoryStats = payments.reduce((acc, payment) => {
      if (!acc[payment.category]) {
        acc[payment.category] = { amount: 0, count: 0 };
      }
      acc[payment.category].amount += payment.amount;
      acc[payment.category].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; count: number }>);
    
    const categoryColors = {
      '카페': '#ff9500',
      '식당': '#ff6b6b', 
      '쇼핑': '#8b5cf6',
      '온라인쇼핑': '#3182f6',
      '교통': '#00c896',
      '의료': '#f472b6',
      '문화': '#fbbf24',
    };
    
    const sortedCategories = Object.entries(categoryStats)
      .sort(([,a], [,b]) => b.amount - a.amount)
      .map(([category, stats]) => ({
        name: category,
        amount: stats.amount,
        count: stats.count,
        percentage: (stats.amount / totalAmount) * 100,
        color: categoryColors[category as keyof typeof categoryColors] || theme.colors.gray[400],
      }));
    
    // 결제수단별 집계
    const paymentMethodStats = payments.reduce((acc, payment) => {
      if (!acc[payment.paymentMethod]) {
        acc[payment.paymentMethod] = 0;
      }
      acc[payment.paymentMethod] += 1;
      return acc;
    }, {} as Record<string, number>);
    
    const sortedPaymentMethods = Object.entries(paymentMethodStats)
      .sort(([,a], [,b]) => b - a);
    
    return {
      totalAmount,
      totalCount,
      averageAmount,
      categories: sortedCategories,
      paymentMethods: sortedPaymentMethods,
    };
  }, [payments]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  return (
    <SummaryContainer>
      <SummaryCard>
        <CardTitle>이번 달 총 결제</CardTitle>
        <CardValue>{formatAmount(summary.totalAmount)}</CardValue>
        <CardSubtext>
          총 {summary.totalCount}건 결제 • 평균 {formatAmount(summary.averageAmount)}
        </CardSubtext>
      </SummaryCard>

      <SummaryCard>
        <CardTitle>카테고리별 지출</CardTitle>
        <CategoryList>
          {summary.categories.slice(0, 5).map((category) => (
            <div key={category.name}>
              <CategoryItem>
                <CategoryName>{category.name}</CategoryName>
                <CategoryAmount>{formatAmount(category.amount)}</CategoryAmount>
              </CategoryItem>
              <CategoryBar 
                percentage={category.percentage} 
                color={category.color}
              />
            </div>
          ))}
        </CategoryList>
      </SummaryCard>

      <SummaryCard>
        <CardTitle>자주 사용하는 결제수단</CardTitle>
        <PaymentMethodList>
          {summary.paymentMethods.map(([method, count]) => (
            <PaymentMethodItem key={method}>
              <PaymentMethodName>{method}</PaymentMethodName>
              <PaymentMethodCount>{count}회</PaymentMethodCount>
            </PaymentMethodItem>
          ))}
        </PaymentMethodList>
      </SummaryCard>
    </SummaryContainer>
  );
};