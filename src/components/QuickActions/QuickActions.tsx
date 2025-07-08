'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Button } from '@/components/Button';

interface QuickActionsProps {
  onTransfer: () => void;
  onPay: () => void;
  onTopUp: () => void;
}

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xs};
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md};
  height: auto;
  min-height: 80px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: flex-start;
    min-height: 60px;
    padding: ${theme.spacing.md};
  }
`;

const ActionIcon = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  line-height: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const ActionLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.md};
  }
`;

export const QuickActions: React.FC<QuickActionsProps> = ({
  onTransfer,
  onPay,
  onTopUp,
}) => {
  return (
    <ActionsContainer>
      <ActionButton variant="primary" onClick={onTransfer}>
        <ActionIcon>💸</ActionIcon>
        <ActionLabel>송금</ActionLabel>
      </ActionButton>
      
      <ActionButton variant="secondary" onClick={onPay}>
        <ActionIcon>💳</ActionIcon>
        <ActionLabel>결제</ActionLabel>
      </ActionButton>
      
      <ActionButton variant="outline" onClick={onTopUp}>
        <ActionIcon>💰</ActionIcon>
        <ActionLabel>충전</ActionLabel>
      </ActionButton>
    </ActionsContainer>
  );
};