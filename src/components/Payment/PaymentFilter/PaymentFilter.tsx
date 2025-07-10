'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Payment, PaymentFilter as IPaymentFilter } from '@/app/pay/page';

interface PaymentFilterProps {
  filter: IPaymentFilter;
  onFilterChange: (filter: IPaymentFilter) => void;
  payments: Payment[];
}

const FilterContainer = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: ${theme.spacing.md};
`;

const QuickFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const QuickFilterButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.white};
  color: ${({ active }) => 
    active ? theme.colors.white : theme.colors.gray[700]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  white-space: nowrap;
  
  &:hover {
    background: ${({ active }) => 
      active ? theme.colors.primary[700] : theme.colors.gray[100]};
    transform: translateY(-1px);
  }
`;

const CategoryScrollContainer = styled.div`
  overflow-x: auto;
  margin-bottom: ${theme.spacing.md};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: 2px;
    
    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  padding-bottom: ${theme.spacing.xs};
  min-width: max-content;
`;

const CategoryChip = styled.button<{ active: boolean; category: string }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${({ active, category }) => {
    if (active) return theme.colors.toss.blue;
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
  }};
  border-radius: ${theme.borderRadius.md};
  background: ${({ active, category }) => {
    if (active) return theme.colors.toss.blue;
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
  color: ${({ active, category }) => {
    if (active) return theme.colors.white;
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
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.toss.button};
  }
  
  &::before {
    content: '${({ category }) => {
      const icons = {
        '카페': '☕',
        '식당': '🍽️', 
        '쇼핑': '🛍️',
        '온라인쇼핑': '📱',
        '교통': '🚇',
        '의료': '🏥',
        '문화': '🎭',
      };
      return icons[category as keyof typeof icons] || '📄';
    }}';
    font-size: 14px;
  }
`;

const PaymentMethodFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const PaymentMethodChip = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${({ active }) => 
    active ? theme.colors.toss.lightBlue : theme.colors.white};
  color: ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  white-space: nowrap;
  
  &:hover {
    background: ${({ active }) => 
      active ? theme.colors.toss.lightBlue : theme.colors.gray[100]};
    transform: translateY(-1px);
  }
  
  &::before {
    content: '💳 ';
    margin-right: ${theme.spacing.xs};
  }
`;

const AmountPresets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
`;

const AmountPresetButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${({ active }) => 
    active ? theme.colors.toss.lightBlue : theme.colors.white};
  color: ${({ active }) => 
    active ? theme.colors.toss.blue : theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  white-space: nowrap;
  
  &:hover {
    background: ${({ active }) => 
      active ? theme.colors.toss.lightBlue : theme.colors.gray[100]};
    transform: translateY(-1px);
  }
`;

const FilterSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const FilterCount = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
`;

const ClearAllButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.gray[100]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${theme.colors.gray[200]};
    transform: translateY(-1px);
  }
`;

const SectionTitle = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[700]};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const PaymentFilter: React.FC<PaymentFilterProps> = ({
  filter,
  onFilterChange,
  payments,
}) => {
  // 고유한 카테고리와 결제수단 추출
  const uniqueCategories = Array.from(new Set(payments.map(p => p.category)));
  const uniquePaymentMethods = Array.from(new Set(payments.map(p => p.paymentMethod)));

  // 빠른 날짜 필터
  const setQuickDateFilter = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    onFilterChange({
      ...filter,
      dateRange: { start, end }
    });
  };

  const isQuickDateActive = (days: number) => {
    if (!filter.dateRange.start || !filter.dateRange.end) return false;
    
    const today = new Date();
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - days);
    
    const daysDiff = Math.floor((filter.dateRange.end.getTime() - filter.dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff === days;
  };

  const toggleCategory = (category: string) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category];
    
    onFilterChange({ ...filter, categories: newCategories });
  };

  const togglePaymentMethod = (method: string) => {
    const newMethods = filter.paymentMethods.includes(method)
      ? filter.paymentMethods.filter(m => m !== method)
      : [...filter.paymentMethods, method];
    
    onFilterChange({ ...filter, paymentMethods: newMethods });
  };

  // 금액 프리셋 설정
  const setAmountPreset = (min: number, max: number) => {
    onFilterChange({
      ...filter,
      amountRange: { min, max }
    });
  };

  const isAmountPresetActive = (min: number, max: number) => {
    return filter.amountRange.min === min && filter.amountRange.max === max;
  };

  const clearAllFilters = () => {
    onFilterChange({
      dateRange: { start: null, end: null },
      categories: [],
      paymentMethods: [],
      amountRange: { min: 0, max: 1000000 },
    });
  };

  const hasActiveFilters = 
    filter.dateRange.start || 
    filter.dateRange.end || 
    filter.categories.length > 0 || 
    filter.paymentMethods.length > 0 ||
    filter.amountRange.min > 0 ||
    filter.amountRange.max < 1000000;

  const activeFilterCount = 
    (filter.dateRange.start || filter.dateRange.end ? 1 : 0) +
    filter.categories.length + 
    filter.paymentMethods.length +
    (filter.amountRange.min > 0 || filter.amountRange.max < 1000000 ? 1 : 0);

  return (
    <FilterContainer>
      <FilterSummary>
        <FilterCount>
          {activeFilterCount > 0 ? `${activeFilterCount}개 필터 적용` : '모든 결제 내역'}
        </FilterCount>
        {hasActiveFilters && (
          <ClearAllButton onClick={clearAllFilters}>
            전체 초기화
          </ClearAllButton>
        )}
      </FilterSummary>

      {/* 빠른 날짜 필터 */}
      <SectionTitle>기간</SectionTitle>
      <QuickFilters>
        <QuickFilterButton 
          active={isQuickDateActive(0)}
          onClick={() => setQuickDateFilter(0)}
        >
          오늘
        </QuickFilterButton>
        <QuickFilterButton 
          active={isQuickDateActive(7)}
          onClick={() => setQuickDateFilter(7)}
        >
          1주일
        </QuickFilterButton>
        <QuickFilterButton 
          active={isQuickDateActive(30)}
          onClick={() => setQuickDateFilter(30)}
        >
          1개월
        </QuickFilterButton>
        <QuickFilterButton 
          active={isQuickDateActive(90)}
          onClick={() => setQuickDateFilter(90)}
        >
          3개월
        </QuickFilterButton>
      </QuickFilters>

      {/* 카테고리 필터 */}
      <SectionTitle>카테고리</SectionTitle>
      <CategoryScrollContainer>
        <CategoryFilters>
          {uniqueCategories.map(category => (
            <CategoryChip
              key={category}
              category={category}
              active={filter.categories.includes(category)}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </CategoryChip>
          ))}
        </CategoryFilters>
      </CategoryScrollContainer>

      {/* 결제수단 필터 */}
      <SectionTitle>결제수단</SectionTitle>
      <PaymentMethodFilters>
        {uniquePaymentMethods.map(method => (
          <PaymentMethodChip
            key={method}
            active={filter.paymentMethods.includes(method)}
            onClick={() => togglePaymentMethod(method)}
          >
            {method}
          </PaymentMethodChip>
        ))}
      </PaymentMethodFilters>

      {/* 금액 프리셋 */}
      <SectionTitle>금액대</SectionTitle>
      <AmountPresets>
        <AmountPresetButton 
          active={isAmountPresetActive(0, 10000)}
          onClick={() => setAmountPreset(0, 10000)}
        >
          1만원 이하
        </AmountPresetButton>
        <AmountPresetButton 
          active={isAmountPresetActive(10000, 50000)}
          onClick={() => setAmountPreset(10000, 50000)}
        >
          1~5만원
        </AmountPresetButton>
        <AmountPresetButton 
          active={isAmountPresetActive(50000, 100000)}
          onClick={() => setAmountPreset(50000, 100000)}
        >
          5~10만원
        </AmountPresetButton>
        <AmountPresetButton 
          active={isAmountPresetActive(100000, 1000000)}
          onClick={() => setAmountPreset(100000, 1000000)}
        >
          10만원 이상
        </AmountPresetButton>
      </AmountPresets>
    </FilterContainer>
  );
};