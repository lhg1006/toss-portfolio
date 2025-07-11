'use client';

import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { InvestmentSummary } from '@/components/Investment/InvestmentSummary';
import { InvestmentList } from '@/components/Investment/InvestmentList';
import { InvestmentFilter } from '@/components/Investment/InvestmentFilter';

export interface Investment {
  id: string;
  type: 'stock' | 'fund' | 'etf';
  name: string;
  ticker: string;
  currentPrice: number;
  previousPrice: number;
  quantity: number;
  avgBuyPrice: number;
  marketValue: number;
  totalReturn: number;
  returnRate: number;
  sector: string;
  country: string;
}

const InvestContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const InvestHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const InvestTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing.sm} 0;
  letter-spacing: -0.02em;
`;

const InvestSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.gray[600]};
  margin: 0;
`;

const mockInvestments: Investment[] = [
  {
    id: '1',
    type: 'stock',
    name: '삼성전자',
    ticker: '005930',
    currentPrice: 78500,
    previousPrice: 77000,
    quantity: 10,
    avgBuyPrice: 75000,
    marketValue: 785000,
    totalReturn: 35000,
    returnRate: 4.67,
    sector: '반도체',
    country: '한국'
  },
  {
    id: '2',
    type: 'stock',
    name: 'TESLA',
    ticker: 'TSLA',
    currentPrice: 248.42,
    previousPrice: 251.05,
    quantity: 5,
    avgBuyPrice: 220.00,
    marketValue: 1242.10,
    totalReturn: 142.10,
    returnRate: 12.92,
    sector: '자동차',
    country: '미국'
  },
  {
    id: '3',
    type: 'etf',
    name: 'KODEX 200',
    ticker: '069500',
    currentPrice: 33150,
    previousPrice: 33000,
    quantity: 15,
    avgBuyPrice: 32000,
    marketValue: 497250,
    totalReturn: 17250,
    returnRate: 3.59,
    sector: 'ETF',
    country: '한국'
  },
  {
    id: '4',
    type: 'fund',
    name: '미래에셋 글로벌 성장펀드',
    ticker: 'MG001',
    currentPrice: 15420,
    previousPrice: 15380,
    quantity: 100,
    avgBuyPrice: 14800,
    marketValue: 1542000,
    totalReturn: 62000,
    returnRate: 4.19,
    sector: '혼합형',
    country: '글로벌'
  },
  {
    id: '5',
    type: 'stock',
    name: 'NVIDIA',
    ticker: 'NVDA',
    currentPrice: 875.30,
    previousPrice: 868.50,
    quantity: 2,
    avgBuyPrice: 420.00,
    marketValue: 1750.60,
    totalReturn: 910.60,
    returnRate: 108.40,
    sector: '반도체',
    country: '미국'
  },
  {
    id: '6',
    type: 'stock',
    name: 'SK하이닉스',
    ticker: '000660',
    currentPrice: 185000,
    previousPrice: 182000,
    quantity: 3,
    avgBuyPrice: 170000,
    marketValue: 555000,
    totalReturn: 45000,
    returnRate: 8.82,
    sector: '반도체',
    country: '한국'
  }
];

export default function InvestPage() {
  const [investments] = useState<Investment[]>(mockInvestments);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  const filteredInvestments = useMemo(() => {
    return investments.filter(investment => {
      if (typeFilter !== 'all' && investment.type !== typeFilter) return false;
      if (sectorFilter !== 'all' && investment.sector !== sectorFilter) return false;
      if (countryFilter !== 'all' && investment.country !== countryFilter) return false;
      return true;
    });
  }, [investments, typeFilter, sectorFilter, countryFilter]);

  const handleFilterChange = (filters: {
    type: string;
    sector: string;
    country: string;
  }) => {
    setTypeFilter(filters.type);
    setSectorFilter(filters.sector);
    setCountryFilter(filters.country);
  };

  return (
    <>
      <Header title="투자" />
      <Layout>
        <InvestContainer>
          <InvestHeader>
            <InvestTitle>투자</InvestTitle>
            <InvestSubtitle>포트폴리오 현황과 수익률을 확인해보세요</InvestSubtitle>
          </InvestHeader>

          <InvestmentSummary investments={filteredInvestments} />
          
          <InvestmentFilter
            typeFilter={typeFilter}
            sectorFilter={sectorFilter}
            countryFilter={countryFilter}
            onFilterChange={handleFilterChange}
          />
          
          <InvestmentList investments={filteredInvestments} />
        </InvestContainer>
      </Layout>
      <Navigation activeTab="invest" />
    </>
  );
}