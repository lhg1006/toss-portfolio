'use client';

import { useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Button } from '@/components/Button';
import { TransferData } from '@/app/transfer/page';

interface TransferCompleteProps {
  amount: number;
  recipient: NonNullable<TransferData['recipient']>;
  onComplete: () => void;
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

const scaleIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  text-align: center;
  gap: ${theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: ${theme.colors.toss.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: ${theme.colors.white};
  animation: ${scaleIn} 0.5s ease-out;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  animation: ${fadeIn} 0.5s ease-out 0.2s both;
`;

const Summary = styled.div`
  animation: ${fadeIn} 0.5s ease-out 0.4s both;
`;

const Amount = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.toss.blue};
  margin-bottom: ${theme.spacing.md};
`;

const RecipientInfo = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.gray[700]};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const TransactionInfo = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
  animation: ${fadeIn} 0.5s ease-out 0.6s both;
  width: 100%;
  max-width: 400px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
`;

const InfoValue = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[900]};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.5s ease-out 0.8s both;
`;

export const TransferComplete: React.FC<TransferCompleteProps> = ({
  amount,
  recipient,
  onComplete,
}) => {
  const formatAmount = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    // 진동 효과 (모바일)
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  }, []);

  return (
    <Container>
      <SuccessIcon>✓</SuccessIcon>

      <div>
        <Title>송금이 완료되었어요</Title>
        <Summary>
          <Amount>{formatAmount(amount)}원</Amount>
          <RecipientInfo>
            {recipient.name}님에게
            <br />
            송금했어요
          </RecipientInfo>
        </Summary>
      </div>

      <TransactionInfo>
        <InfoRow>
          <InfoLabel>송금 일시</InfoLabel>
          <InfoValue>{formatDate()}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>받는 계좌</InfoLabel>
          <InfoValue>
            {recipient.bank} {recipient.accountNumber.slice(-4)}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>송금 수수료</InfoLabel>
          <InfoValue>무료</InfoValue>
        </InfoRow>
      </TransactionInfo>

      <ButtonGroup>
        <Button variant="primary" onClick={onComplete}>
          확인
        </Button>
        <Button variant="ghost" onClick={() => window.print()}>
          거래 내역 저장
        </Button>
      </ButtonGroup>
    </Container>
  );
};