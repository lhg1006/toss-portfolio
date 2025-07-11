'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Investment } from '@/app/invest/page';

interface InvestmentListProps {
  investments: Investment[];
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const InvestmentCard = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.toss.card};
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: ${theme.effects.transition};
  
  &:hover {
    box-shadow: ${theme.shadows.toss.button};
    transform: translateY(-2px);
    background: ${theme.colors.white};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const InvestmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

const InvestmentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const InvestmentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }
`;

const InvestmentName = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  letter-spacing: -0.01em;
`;

const InvestmentTicker = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.mono.join(', ')};
`;

const InvestmentType = styled.span<{ type: string }>`
  background-color: ${({ type }) => {
    const colors = {
      'stock': '#e8f3ff',
      'fund': '#f3e5f5',
      'etf': '#e8f5e8',
    };
    return colors[type as keyof typeof colors] || theme.colors.gray[100];
  }};
  color: ${({ type }) => {
    const colors = {
      'stock': '#3182f6',
      'fund': '#8b5cf6',
      'etf': '#00c896',
    };
    return colors[type as keyof typeof colors] || theme.colors.gray[600];
  }};
  padding: 4px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: -0.01em;
  border: 1px solid ${({ type }) => {
    const colors = {
      'stock': '#3182f6',
      'fund': '#8b5cf6',
      'etf': '#00c896',
    };
    return colors[type as keyof typeof colors] || theme.colors.gray[300];
  }}20;
`;

const InvestmentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[400]};
  flex-wrap: wrap;
`;

const InvestmentMetaItem = styled.span`
  padding: 2px ${theme.spacing.xs};
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[600]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const InvestmentNumbers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
  min-width: 160px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start;
    width: 100%;
  }
`;

const CurrentPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`;

const PriceAmount = styled.span`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: normal;
  color: ${theme.colors.gray[900]};
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
`;

const PriceChange = styled.span<{ isPositive: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ isPositive }) => isPositive ? theme.colors.toss.green : theme.colors.toss.red};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const MarketValue = styled.div`
  text-align: right;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: left;
  }
`;

const MarketValueAmount = styled.span`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize.md};
  font-weight: normal;
  color: ${theme.colors.gray[800]};
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
`;

const MarketValueLabel = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[500]};
  margin-left: ${theme.spacing.xs};
`;

const ReturnInfo = styled.div<{ isPositive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`;

const ReturnAmount = styled.span<{ isPositive: boolean }>`
  font-family: ${theme.typography.fontFamily.pixel.join(', ')};
  font-size: ${theme.typography.fontSize.md};
  font-weight: normal;
  color: ${({ isPositive }) => isPositive ? theme.colors.toss.green : theme.colors.toss.red};
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
`;

const ReturnRate = styled.span<{ isPositive: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ isPositive }) => isPositive ? theme.colors.toss.green : theme.colors.toss.red};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.gray[500]};
  background: ${theme.colors.backgrounds.glassBlur};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const InvestmentList: React.FC<InvestmentListProps> = ({ investments }) => {

  const formatAmount = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`;
    } else {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }).format(amount);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'stock': '주식',
      'fund': '펀드',
      'etf': 'ETF'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const changePercent = (change / previous) * 100;
    return { change, changePercent };
  };

  if (investments.length === 0) {
    return (
      <EmptyState>조건에 맞는 투자 상품이 없습니다.</EmptyState>
    );
  }

  return (
    <ListContainer>
      {investments.map((investment) => {
        const { change, changePercent } = getPriceChange(investment.currentPrice, investment.previousPrice);
        const isPositivePrice = change >= 0;
        const isPositiveReturn = investment.totalReturn >= 0;

        return (
          <InvestmentCard 
            key={investment.id}
          >
            <InvestmentItem>
              <InvestmentInfo>
                <InvestmentHeader>
                  <InvestmentName>{investment.name}</InvestmentName>
                  <InvestmentTicker>{investment.ticker}</InvestmentTicker>
                  <InvestmentType type={investment.type}>
                    {getTypeLabel(investment.type)}
                  </InvestmentType>
                </InvestmentHeader>
                
                <InvestmentMeta>
                  <InvestmentMetaItem>{investment.sector}</InvestmentMetaItem>
                  <span>•</span>
                  <InvestmentMetaItem>{investment.country}</InvestmentMetaItem>
                  <span>•</span>
                  <span>{investment.quantity}주</span>
                </InvestmentMeta>
              </InvestmentInfo>

              <InvestmentNumbers>
                <CurrentPrice>
                  <PriceAmount>{formatPrice(investment.currentPrice)}</PriceAmount>
                  <PriceChange isPositive={isPositivePrice}>
                    <span>{isPositivePrice ? '▲' : '▼'}</span>
                    <span>{formatPercent(changePercent)}</span>
                  </PriceChange>
                </CurrentPrice>
                
                <MarketValue>
                  <MarketValueAmount>{formatAmount(investment.marketValue)}</MarketValueAmount>
                  <MarketValueLabel>평가금액</MarketValueLabel>
                </MarketValue>
                
                <ReturnInfo isPositive={isPositiveReturn}>
                  <ReturnAmount isPositive={isPositiveReturn}>
                    {formatAmount(investment.totalReturn)}
                  </ReturnAmount>
                  <ReturnRate isPositive={isPositiveReturn}>
                    <span>{isPositiveReturn ? '▲' : '▼'}</span>
                    <span>{formatPercent(investment.returnRate)}</span>
                  </ReturnRate>
                </ReturnInfo>
              </InvestmentNumbers>
            </InvestmentItem>
          </InvestmentCard>
        );
      })}
    </ListContainer>
  );
};