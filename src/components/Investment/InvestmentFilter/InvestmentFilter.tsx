'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface InvestmentFilterProps {
  typeFilter: string;
  sectorFilter: string;
  countryFilter: string;
  onFilterChange: (filters: {
    type: string;
    sector: string;
    country: string;
  }) => void;
}

const FilterContainer = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const FilterTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FilterLabel = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.xs};
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.toss.blue};
    box-shadow: 0 0 0 3px rgba(49, 130, 246, 0.1);
  }
  
  &:hover {
    border-color: ${theme.colors.gray[400]};
  }
`;

const QuickFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

const QuickFilterButton = styled.button<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${({ active }) => active ? theme.colors.toss.blue : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${({ active }) => active ? theme.colors.toss.blue : theme.colors.white};
  color: ${({ active }) => active ? theme.colors.white : theme.colors.gray[700]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${({ active }) => active ? theme.colors.toss.blue : theme.colors.gray[50]};
    border-color: ${({ active }) => active ? theme.colors.toss.blue : theme.colors.gray[400]};
  }
`;

const ResetButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[700]};
  }
`;

export const InvestmentFilter: React.FC<InvestmentFilterProps> = ({
  typeFilter,
  sectorFilter,
  countryFilter,
  onFilterChange,
}) => {
  const handleFilterChange = (field: string, value: string) => {
    const newFilters = {
      type: typeFilter,
      sector: sectorFilter,
      country: countryFilter,
      [field]: value,
    };
    onFilterChange(newFilters);
  };

  const handleQuickFilter = (filters: { type?: string; sector?: string; country?: string }) => {
    onFilterChange({
      type: filters.type || typeFilter,
      sector: filters.sector || sectorFilter,
      country: filters.country || countryFilter,
    });
  };

  const handleReset = () => {
    onFilterChange({
      type: 'all',
      sector: 'all',
      country: 'all',
    });
  };

  return (
    <FilterContainer>
      <FilterTitle>필터</FilterTitle>
      
      <FilterGrid>
        <FilterGroup>
          <FilterLabel>자산 유형</FilterLabel>
          <FilterSelect
            value={typeFilter}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">전체</option>
            <option value="stock">주식</option>
            <option value="fund">펀드</option>
            <option value="etf">ETF</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>섹터</FilterLabel>
          <FilterSelect
            value={sectorFilter}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
          >
            <option value="all">전체</option>
            <option value="반도체">반도체</option>
            <option value="자동차">자동차</option>
            <option value="혼합형">혼합형</option>
            <option value="ETF">ETF</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>국가/지역</FilterLabel>
          <FilterSelect
            value={countryFilter}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <option value="all">전체</option>
            <option value="한국">한국</option>
            <option value="미국">미국</option>
            <option value="글로벌">글로벌</option>
          </FilterSelect>
        </FilterGroup>
      </FilterGrid>

      <QuickFilters>
        <QuickFilterButton
          active={typeFilter === 'stock'}
          onClick={() => handleQuickFilter({ type: 'stock' })}
        >
          📈 주식만 보기
        </QuickFilterButton>
        
        <QuickFilterButton
          active={countryFilter === '한국'}
          onClick={() => handleQuickFilter({ country: '한국' })}
        >
          🇰🇷 국내 투자
        </QuickFilterButton>
        
        <QuickFilterButton
          active={countryFilter === '미국'}
          onClick={() => handleQuickFilter({ country: '미국' })}
        >
          🇺🇸 미국 투자
        </QuickFilterButton>
        
        <QuickFilterButton
          active={sectorFilter === '반도체'}
          onClick={() => handleQuickFilter({ sector: '반도체' })}
        >
          💾 반도체
        </QuickFilterButton>
        
        <ResetButton onClick={handleReset}>
          전체 보기
        </ResetButton>
      </QuickFilters>
    </FilterContainer>
  );
};