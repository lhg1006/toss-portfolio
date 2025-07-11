'use client';

import { useMemo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Investment } from '@/app/invest/page';

interface InvestmentSummaryProps {
  investments: Investment[];
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

const CardValue = styled.div<{ isPositive?: boolean }>`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: normal;
  color: ${({ isPositive }) => 
    isPositive === undefined 
      ? theme.colors.gray[900]
      : isPositive 
        ? theme.colors.toss.green 
        : theme.colors.toss.red
  };
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

const ReturnIndicator = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ isPositive }) => isPositive ? theme.colors.toss.green : theme.colors.toss.red};
`;

const AssetAllocation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const AllocationItem = styled.div`
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

const AllocationName = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
`;

const AllocationValue = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  font-variant-numeric: tabular-nums;
`;

const AllocationBar = styled.div<{ percentage: number; color: string }>`
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

export const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({ investments }) => {
  const summary = useMemo(() => {
    const totalMarketValue = investments.reduce((sum, inv) => sum + inv.marketValue, 0);
    const totalReturn = investments.reduce((sum, inv) => sum + inv.totalReturn, 0);
    const totalInvested = totalMarketValue - totalReturn;
    const totalReturnRate = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
    
    // 자산 유형별 분배
    const typeAllocation = investments.reduce((acc, inv) => {
      const typeNames = {
        'stock': '주식',
        'fund': '펀드',
        'etf': 'ETF'
      };
      const typeName = typeNames[inv.type] || inv.type;
      
      if (!acc[typeName]) {
        acc[typeName] = 0;
      }
      acc[typeName] += inv.marketValue;
      return acc;
    }, {} as Record<string, number>);
    
    const typeColors = {
      '주식': '#3182f6',
      '펀드': '#8b5cf6', 
      'ETF': '#00c896'
    };
    
    const sortedTypes = Object.entries(typeAllocation)
      .sort(([,a], [,b]) => b - a)
      .map(([type, value]) => ({
        name: type,
        value,
        percentage: (value / totalMarketValue) * 100,
        color: typeColors[type as keyof typeof typeColors] || theme.colors.gray[400],
      }));
    
    // 지역별 분배
    const countryAllocation = investments.reduce((acc, inv) => {
      if (!acc[inv.country]) {
        acc[inv.country] = 0;
      }
      acc[inv.country] += inv.marketValue;
      return acc;
    }, {} as Record<string, number>);
    
    const countryColors = {
      '한국': '#ff6b6b',
      '미국': '#3182f6',
      '글로벌': '#00c896'
    };
    
    const sortedCountries = Object.entries(countryAllocation)
      .sort(([,a], [,b]) => b - a)
      .map(([country, value]) => ({
        name: country,
        value,
        percentage: (value / totalMarketValue) * 100,
        color: countryColors[country as keyof typeof countryColors] || theme.colors.gray[400],
      }));
    
    return {
      totalMarketValue,
      totalReturn,
      totalInvested,
      totalReturnRate,
      typeAllocation: sortedTypes,
      countryAllocation: sortedCountries,
      holdingCount: investments.length,
    };
  }, [investments]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <SummaryContainer>
      <SummaryCard>
        <CardTitle>총 평가금액</CardTitle>
        <CardValue>{formatAmount(summary.totalMarketValue)}</CardValue>
        <CardSubtext>
          {summary.holdingCount}개 종목 보유
        </CardSubtext>
      </SummaryCard>

      <SummaryCard>
        <CardTitle>평가손익</CardTitle>
        <CardValue isPositive={summary.totalReturn >= 0}>
          {formatAmount(summary.totalReturn)}
        </CardValue>
        <ReturnIndicator isPositive={summary.totalReturnRate >= 0}>
          <span>{summary.totalReturnRate >= 0 ? '▲' : '▼'}</span>
          <span>{formatPercent(summary.totalReturnRate)}</span>
        </ReturnIndicator>
      </SummaryCard>

      <SummaryCard>
        <CardTitle>자산 유형별 분배</CardTitle>
        <AssetAllocation>
          {summary.typeAllocation.map((type) => (
            <div key={type.name}>
              <AllocationItem>
                <AllocationName>{type.name}</AllocationName>
                <AllocationValue>{formatAmount(type.value)}</AllocationValue>
              </AllocationItem>
              <AllocationBar 
                percentage={type.percentage} 
                color={type.color}
              />
            </div>
          ))}
        </AssetAllocation>
      </SummaryCard>

      <SummaryCard>
        <CardTitle>지역별 분배</CardTitle>
        <AssetAllocation>
          {summary.countryAllocation.map((country) => (
            <div key={country.name}>
              <AllocationItem>
                <AllocationName>{country.name}</AllocationName>
                <AllocationValue>{formatAmount(country.value)}</AllocationValue>
              </AllocationItem>
              <AllocationBar 
                percentage={country.percentage} 
                color={country.color}
              />
            </div>
          ))}
        </AssetAllocation>
      </SummaryCard>
    </SummaryContainer>
  );
};