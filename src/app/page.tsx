'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { 
  Layout, 
  Header,
  AccountCard, 
  TransactionList, 
  QuickActions,
  BenefitsSummary,
  Navigation,
  CardSlider
} from '@/components';

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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[800]};
  margin: 0;
`;

const ViewToggleButton = styled.button`
  background: ${theme.colors.gray[100]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  animation: ${slideIn} 0.6s ease-out 0.2s both;
  
  &:hover {
    background: ${theme.colors.gray[200]};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const AccountsGrid = styled.div<{ isVisible: boolean }>`
  display: grid;
  gap: ${theme.spacing.md};
  opacity: ${props => props.isVisible ? 1 : 0};
  min-height: 240px; /* 최소 높이 고정으로 레이아웃 시프트 방지 */
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    margin: 0 auto;
    min-height: 220px;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    min-height: 440px;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    min-height: 880px;
  }
  
  & > div {
    /* 개별 카드 애니메이션 제거로 reflow 최소화 */
    opacity: ${props => props.isVisible ? 1 : 0};
    transition: opacity 0.3s ease-out;
  }
`;

const SliderContainer = styled.div<{ isVisible: boolean }>`
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease-out;
  min-height: 240px; /* 슬라이더 최소 높이 고정 */
  overflow: hidden;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 220px;
  }
`;


export default function Home() {
  const [balanceVisibility, setBalanceVisibility] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true
  });
  const [isGridView, setIsGridView] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      type: "income" as const,
      amount: 50000,
      description: "카카오페이 충전",
      date: new Date("2024-07-07T14:30:00"),
      category: "충전",
    },
    {
      id: "2",
      type: "expense" as const,
      amount: 12000,
      description: "스타벅스 아메리카노",
      date: new Date("2024-07-07T09:15:00"),
      category: "카페",
    },
    {
      id: "3",
      type: "expense" as const,
      amount: 8500,
      description: "지하철 교통비",
      date: new Date("2024-07-06T18:45:00"),
      category: "교통",
    },
  ]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  
  const accounts = [
    {
      id: 0,
      accountName: "토스뱅크 입출금",
      accountNumber: "100012345678",
      balance: 1250000,
      cardColor: "blue" as const,
    },
    {
      id: 1,
      accountName: "토스뱅크 적금",
      accountNumber: "200012345678",
      balance: 5000000,
      cardColor: "green" as const,
    },
    {
      id: 2,
      accountName: "토스뱅크 모임통장",
      accountNumber: "300012345678",
      balance: 850000,
      cardColor: "purple" as const,
    },
    {
      id: 3,
      accountName: "토스뱅크 외화통장",
      accountNumber: "400012345678",
      balance: 2300000,
      cardColor: "orange" as const,
    },
  ];

  const benefits = [
    {
      id: "1",
      category: "카페",
      icon: "☕",
      amount: 15000,
      description: "스타벅스 5% 적립",
      color: "#ff9500",
    },
    {
      id: "2",
      category: "교통",
      icon: "🚇",
      amount: 8000,
      description: "대중교통 무제한 무료",
      color: "#3182f6",
    },
    {
      id: "3",
      category: "쇼핑",
      icon: "🛒",
      amount: 25000,
      description: "온라인 쇼핑 3% 적립",
      color: "#8b5cf6",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleTransfer = () => {
    window.location.href = '/transfer';
  };

  const handlePay = () => {
    window.location.href = '/pay';
  };

  const handleInvest = () => {
    window.location.href = '/invest';
  };

  const handleLoadMore = () => {
    if (loading) return;
    
    setLoading(true);
    
    // 더미 데이터 생성
    setTimeout(() => {
      const newTransactions = [
        {
          id: `${transactions.length + 1}`,
          type: "expense" as const,
          amount: Math.floor(Math.random() * 50000) + 5000,
          description: "새로운 거래",
          date: new Date(Date.now() - Math.random() * 86400000 * 7),
          category: "기타",
        },
        {
          id: `${transactions.length + 2}`,
          type: "income" as const,
          amount: Math.floor(Math.random() * 100000) + 10000,
          description: "입금",
          date: new Date(Date.now() - Math.random() * 86400000 * 7),
          category: "입금",
        },
      ];
      
      setTransactions(prev => [...prev, ...newTransactions]);
      setLoading(false);
      
      if (transactions.length > 20) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <>
      <Header title="토스뱅크" />
      <Layout>
        <PageTitle>토스뱅크</PageTitle>
        
        <Section>
          <SectionHeader>
            <SectionTitle>내 계좌</SectionTitle>
            <ViewToggleButton onClick={() => setIsGridView(!isGridView)}>
              {isGridView ? '◀▶' : '⊞'} {isGridView ? '슬라이드 보기' : '모두 보기'}
            </ViewToggleButton>
          </SectionHeader>
          
          {isGridView ? (
            <AccountsGrid isVisible={true}>
              {accounts.map((account) => (
                <AccountCard 
                  key={account.id} 
                  {...account} 
                  isLoading={!cardsLoaded}
                  balanceVisible={balanceVisibility[account.id]}
                  onToggleBalance={() => {
                    setBalanceVisibility(prev => ({
                      ...prev,
                      [account.id]: !prev[account.id]
                    }));
                  }}
                />
              ))}
            </AccountsGrid>
          ) : (
            <SliderContainer isVisible={true}>
              <CardSlider>
                {accounts.map((account) => (
                  <AccountCard 
                    key={account.id} 
                    {...account} 
                    isLoading={!cardsLoaded}
                    balanceVisible={balanceVisibility[account.id]}
                    onToggleBalance={() => {
                      setBalanceVisibility(prev => ({
                        ...prev,
                        [account.id]: !prev[account.id]
                    }));
                    }}
                  />
                ))}
              </CardSlider>
            </SliderContainer>
          )}
        </Section>

        <Section>
          <BenefitsSummary benefits={benefits} />
        </Section>

        <Section>
          <SectionTitle>빠른 실행</SectionTitle>
          <QuickActions
            onTransfer={handleTransfer}
            onPay={handlePay}
            onInvest={handleInvest}
          />
        </Section>

        <Section>
          <SectionTitle>최근 거래</SectionTitle>
          <TransactionList 
            transactions={transactions}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </Section>
      </Layout>
      <Navigation activeTab="home" />
    </>
  );
}
