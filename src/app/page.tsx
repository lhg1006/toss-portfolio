'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { 
  Layout, 
  AccountCard, 
  TransactionList, 
  QuickActions 
} from '@/components';

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  
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

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.md};
`;

const AccountsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

export default function Home() {
  const accounts = [
    {
      accountName: "토스뱅크 입출금",
      accountNumber: "100012345678",
      balance: 1250000,
      cardColor: "blue" as const,
    },
    {
      accountName: "토스뱅크 적금",
      accountNumber: "200012345678",
      balance: 5000000,
      cardColor: "green" as const,
    },
  ];

  const transactions = [
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
  ];

  const handleTransfer = () => {
    console.log("송금 기능");
  };

  const handlePay = () => {
    console.log("결제 기능");
  };

  const handleTopUp = () => {
    console.log("충전 기능");
  };

  return (
    <Layout>
      <PageTitle>토스뱅크</PageTitle>
      
      <Section>
        <SectionTitle>내 계좌</SectionTitle>
        <AccountsGrid>
          {accounts.map((account, index) => (
            <AccountCard key={index} {...account} />
          ))}
        </AccountsGrid>
      </Section>

      <Section>
        <SectionTitle>빠른 실행</SectionTitle>
        <QuickActions
          onTransfer={handleTransfer}
          onPay={handlePay}
          onTopUp={handleTopUp}
        />
      </Section>

      <Section>
        <SectionTitle>최근 거래</SectionTitle>
        <TransactionList transactions={transactions} />
      </Section>
    </Layout>
  );
}
