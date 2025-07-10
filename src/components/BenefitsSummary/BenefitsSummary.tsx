'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface Benefit {
  id: string;
  category: string;
  icon: string;
  amount: number;
  description: string;
  color: string;
}

interface BenefitsSummaryProps {
  benefits: Benefit[];
}

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.toss.card};
  margin-bottom: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const TotalAmount = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.toss.blue};
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const BenefitItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${(props) => props.color};
`;

const BenefitIcon = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  margin-right: ${theme.spacing.md};
`;

const BenefitInfo = styled.div`
  flex: 1;
`;

const BenefitCategory = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xs};
`;

const BenefitDescription = styled.div`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[900]};
`;

const BenefitAmount = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.toss.blue};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.gray[200]};
  border-radius: 4px;
  margin-top: ${theme.spacing.lg};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.toss.blue} 0%, ${theme.colors.toss.purple} 100%);
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
  text-align: center;
  margin-top: ${theme.spacing.sm};
`;

export const BenefitsSummary: React.FC<BenefitsSummaryProps> = ({ benefits }) => {
  const totalAmount = benefits.reduce((sum, benefit) => sum + benefit.amount, 0);
  const maxBenefit = 100000; // 이번 달 최대 혜택
  const progress = Math.min((totalAmount / maxBenefit) * 100, 100);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  return (
    <Container>
      <Header>
        <Title>이번 달 카드 혜택</Title>
        <TotalAmount>{formatAmount(totalAmount)}원</TotalAmount>
      </Header>

      <BenefitsList>
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.id} color={benefit.color}>
            <BenefitIcon>{benefit.icon}</BenefitIcon>
            <BenefitInfo>
              <BenefitCategory>{benefit.category}</BenefitCategory>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitInfo>
            <BenefitAmount>+{formatAmount(benefit.amount)}원</BenefitAmount>
          </BenefitItem>
        ))}
      </BenefitsList>

      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      <ProgressText>
        이번 달 혜택 {formatAmount(totalAmount)}원 / {formatAmount(maxBenefit)}원
      </ProgressText>
    </Container>
  );
};