'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Card } from '@/components/Card';

interface AccountCardProps {
  accountName: string;
  accountNumber: string;
  balance: number;
  cardColor?: 'blue' | 'purple' | 'green' | 'orange';
}

const CardContainer = styled.div<{ cardColor?: string }>`
  background: ${(props) => {
    switch (props.cardColor) {
      case 'purple':
        return `linear-gradient(135deg, ${theme.colors.toss.purple} 0%, #6366f1 100%)`;
      case 'green':
        return `linear-gradient(135deg, ${theme.colors.toss.green} 0%, #059669 100%)`;
      case 'orange':
        return `linear-gradient(135deg, ${theme.colors.toss.orange} 0%, #ea580c 100%)`;
      default:
        return `linear-gradient(135deg, ${theme.colors.toss.blue} 0%, #1d4ed8 100%)`;
    }
  }};
  
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${theme.shadows.md};
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255,255,255,0.08);
    border-radius: 50%;
    pointer-events: none;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 180px;
    padding: ${theme.spacing.lg};
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const AccountName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
  letter-spacing: -0.02em;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.md};
  }
`;

const AccountNumber = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.85;
  margin: 0;
  margin-top: ${theme.spacing.xs};
  font-family: ${theme.typography.fontFamily.mono.join(', ')};
  font-weight: ${theme.typography.fontWeight.medium};
  letter-spacing: 0.5px;
  z-index: 1;
`;

const Balance = styled.div`
  text-align: right;
  z-index: 1;
`;

const BalanceAmount = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.heavy};
  margin: 0;
  letter-spacing: -0.03em;
  line-height: ${theme.typography.lineHeight.tight};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const BalanceLabel = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.85;
  margin: 0;
  margin-top: ${theme.spacing.xs};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const TossLogo = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.2);
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: 14px;
  backdrop-filter: blur(10px);
  z-index: 1;
`;

export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  accountNumber,
  balance,
  cardColor = 'blue',
}) => {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const maskedAccountNumber = accountNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-****-$3');

  return (
    <CardContainer cardColor={cardColor}>
      <TossLogo>토</TossLogo>
      <AccountInfo>
        <AccountName>{accountName}</AccountName>
        <AccountNumber>{maskedAccountNumber}</AccountNumber>
      </AccountInfo>
      <Balance>
        <BalanceAmount>{formatBalance(balance)}</BalanceAmount>
        <BalanceLabel>잔액</BalanceLabel>
      </Balance>
    </CardContainer>
  );
};