'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Card } from '@/components/Card';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

interface AccountCardProps {
  accountName: string;
  accountNumber: string;
  balance: number;
  cardColor?: 'blue' | 'purple' | 'green' | 'orange';
  balanceVisible?: boolean;
  onToggleBalance?: () => void;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: ${theme.effects.transition};
  box-shadow: ${theme.shadows.toss.card};
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
    pointer-events: none;
    opacity: 0.8;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    pointer-events: none;
    backdrop-filter: blur(5px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 180px;
    min-width: 250px;
    padding: ${theme.spacing.lg};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const AccountName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
  letter-spacing: -0.02em;
  z-index: 1;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.md};
  }
`;

const AccountNumber = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.7;
  margin: 0;
  font-family: ${theme.typography.fontFamily.mono.join(', ')};
  font-weight: ${theme.typography.fontWeight.medium};
  letter-spacing: 0.5px;
`;

const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.05) translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.4);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${theme.spacing.md};
`;

const BalanceAmount = styled.h2<{ hidden?: boolean }>`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.black};
  margin: 0;
  letter-spacing: -0.03em;
  line-height: ${theme.typography.lineHeight.tight};
  position: relative;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${(props) => props.hidden && `
    filter: blur(8px);
    user-select: none;
    transform: scale(0.98);
    opacity: 0.7;
  `}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['3xl']};
    min-height: 42px;
  }
`;

const ToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.5);
  }
`;

const BalanceLabel = styled.p`
  font-size: ${theme.typography.fontSize.md};
  opacity: 0.9;
  margin: 0;
  font-weight: ${theme.typography.fontWeight.medium};
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  accountNumber,
  balance,
  cardColor = 'blue',
  balanceVisible = true,
  onToggleBalance,
}) => {
  const { showToast } = useToast();
  
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const maskedAccountNumber = accountNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-****-$3');
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(accountNumber);
      showToast('계좌번호가 복사되었습니다');
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('복사에 실패했습니다');
    }
  };

  const handleToggleBalance = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleBalance) {
      onToggleBalance();
    }
  };

  return (
    <CardContainer cardColor={cardColor}>
      <CardHeader>
        <AccountInfo>
          <AccountName>{accountName}</AccountName>
          <AccountNumber>{maskedAccountNumber}</AccountNumber>
        </AccountInfo>
        {onToggleBalance && (
          <ToggleButton onClick={handleToggleBalance}>
            {balanceVisible ? '👁️' : '👁️‍🗨️'}
          </ToggleButton>
        )}
      </CardHeader>
      
      <CardBody>
        <BalanceAmount hidden={!balanceVisible}>
          {balanceVisible ? formatBalance(balance) : '••••••••'}
        </BalanceAmount>
        <CopyButton onClick={handleCopy}>
          계좌번호 복사
        </CopyButton>
      </CardBody>
    </CardContainer>
  );
};