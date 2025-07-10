'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { 
  Layout, 
  Header,
  Navigation 
} from '@/components';
import { PaymentSummary } from '@/components/Payment/PaymentSummary';
import { PaymentList } from '@/components/Payment/PaymentList';
import { PaymentFilter } from '@/components/Payment/PaymentFilter';

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

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.md};
`;

// Mock 결제 데이터
const mockPayments = [
  {
    id: "1",
    type: "expense" as const,
    amount: 28500,
    description: "스타벅스 강남점",
    date: new Date("2024-07-10T14:30:00"),
    category: "카페",
    merchant: "스타벅스 강남점",
    paymentMethod: "토스페이",
    location: "서울 강남구",
  },
  {
    id: "2", 
    type: "expense" as const,
    amount: 45000,
    description: "올리브영 명동점",
    date: new Date("2024-07-10T11:15:00"),
    category: "쇼핑",
    merchant: "올리브영 명동점", 
    paymentMethod: "신한카드",
    installment: 0,
    location: "서울 중구",
  },
  {
    id: "3",
    type: "expense" as const,
    amount: 85000,
    description: "아웃백 스테이크하우스",
    date: new Date("2024-07-09T19:45:00"),
    category: "식당",
    merchant: "아웃백 스테이크하우스 강남점",
    paymentMethod: "토스뱅크 체크카드",
    location: "서울 강남구",
  },
  {
    id: "4",
    type: "expense" as const,
    amount: 12800,
    description: "지하철 교통비",
    date: new Date("2024-07-09T08:20:00"),
    category: "교통",
    merchant: "서울교통공사",
    paymentMethod: "토스페이",
    location: "지하철 2호선 강남역",
  },
  {
    id: "5",
    type: "expense" as const,
    amount: 156000,
    description: "쿠팡 온라인 쇼핑",
    date: new Date("2024-07-08T22:30:00"),
    category: "온라인쇼핑",
    merchant: "쿠팡",
    paymentMethod: "KB국민카드",
    installment: 3,
  },
];

export interface Payment {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
  category: string;
  merchant: string;
  paymentMethod: string;
  installment?: number;
  location?: string;
  receipt?: string;
}

export interface PaymentFilter {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  categories: string[];
  paymentMethods: string[];
  amountRange: {
    min: number;
    max: number;
  };
}

export default function PaymentPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filter, setFilter] = useState<PaymentFilter>({
    dateRange: { start: null, end: null },
    categories: [],
    paymentMethods: [],
    amountRange: { min: 0, max: 1000000 },
  });
  const [loading, setLoading] = useState(false);

  const filteredPayments = payments.filter(payment => {
    // 날짜 필터
    if (filter.dateRange.start && payment.date < filter.dateRange.start) return false;
    if (filter.dateRange.end && payment.date > filter.dateRange.end) return false;
    
    // 카테고리 필터
    if (filter.categories.length > 0 && !filter.categories.includes(payment.category)) return false;
    
    // 결제수단 필터
    if (filter.paymentMethods.length > 0 && !filter.paymentMethods.includes(payment.paymentMethod)) return false;
    
    // 금액 범위 필터
    if (payment.amount < filter.amountRange.min || payment.amount > filter.amountRange.max) return false;
    
    return true;
  });

  const handleLoadMore = () => {
    setLoading(true);
    // 더미 데이터 추가 로직
    setTimeout(() => {
      const newPayments = [
        {
          id: `${payments.length + 1}`,
          type: "expense" as const,
          amount: Math.floor(Math.random() * 50000) + 5000,
          description: "새로운 결제",
          date: new Date(Date.now() - Math.random() * 86400000 * 7),
          category: ["카페", "식당", "쇼핑", "교통"][Math.floor(Math.random() * 4)],
          merchant: "가맹점명",
          paymentMethod: ["토스페이", "신한카드", "KB국민카드"][Math.floor(Math.random() * 3)],
        },
      ];
      
      setPayments(prev => [...prev, ...newPayments]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Header title="결제" showBackButton />
      <Layout>
        <PageTitle>결제</PageTitle>
        
        <Section>
          <PaymentSummary payments={filteredPayments} />
        </Section>

        <Section>
          <SectionTitle>필터</SectionTitle>
          <PaymentFilter 
            filter={filter} 
            onFilterChange={setFilter}
            payments={payments}
          />
        </Section>

        <Section>
          <SectionTitle>결제 내역</SectionTitle>
          <PaymentList 
            payments={filteredPayments}
            onLoadMore={handleLoadMore}
            loading={loading}
            hasMore={true}
          />
        </Section>
      </Layout>
      <Navigation activeTab="pay" />
    </>
  );
}