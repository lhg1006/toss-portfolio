'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Button } from '@/components/Button';
import { TransferData } from '@/app/transfer/page';

interface TransferConfirmProps {
  amount: number;
  recipient: NonNullable<TransferData['recipient']>;
  onConfirm: () => void;
  onBack: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  flex: 1;
`;

const SummaryCard = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const SummarySection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xs};
`;

const SummaryValue = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
`;

const AmountValue = styled(SummaryValue)`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.toss.blue};
`;

const FeeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const FeeLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[700]};
`;

const FeeAmount = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
`;

const Notice = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
  text-align: center;
  margin: ${theme.spacing.lg} 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: auto;
`;

export const TransferConfirm: React.FC<TransferConfirmProps> = ({
  amount,
  recipient,
  onConfirm,
  onBack,
}) => {
  const formatAmount = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>송금 정보를 확인해주세요</Title>
      </Header>

      <SummaryCard>
        <SummarySection>
          <SummaryLabel>보낼 금액</SummaryLabel>
          <AmountValue>{formatAmount(amount)}원</AmountValue>
        </SummarySection>

        <SummarySection>
          <SummaryLabel>받는 사람</SummaryLabel>
          <SummaryValue>{recipient.name}</SummaryValue>
        </SummarySection>

        <SummarySection>
          <SummaryLabel>받는 계좌</SummaryLabel>
          <SummaryValue>
            {recipient.bank} {recipient.accountNumber}
          </SummaryValue>
        </SummarySection>
      </SummaryCard>

      <FeeInfo>
        <FeeLabel>송금 수수료</FeeLabel>
        <FeeAmount>무료</FeeAmount>
      </FeeInfo>

      <Notice>
        송금 후에는 취소할 수 없습니다.
        <br />
        받는 분의 정보를 다시 한번 확인해주세요.
      </Notice>

      <ButtonGroup>
        <Button variant="primary" onClick={onConfirm}>
          {formatAmount(amount)}원 보내기
        </Button>
      </ButtonGroup>
    </Container>
  );
};