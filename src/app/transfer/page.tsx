'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Layout, Header, Navigation } from '@/components';
import { AmountInput } from '@/components/Transfer/AmountInput';
import { RecipientSelect } from '@/components/Transfer/RecipientSelect';
import { TransferConfirm } from '@/components/Transfer/TransferConfirm';
import { TransferComplete } from '@/components/Transfer/TransferComplete';

export type TransferStep = 'amount' | 'recipient' | 'confirm' | 'complete';

export interface TransferData {
  amount: number;
  recipient: {
    id: string;
    name: string;
    bank: string;
    accountNumber: string;
  } | null;
  memo?: string;
}

const TransferContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${theme.colors.gray[200]};
  border-radius: 2px;
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: ${theme.colors.toss.blue};
  transition: width 0.3s ease;
`;

export default function TransferPage() {
  const [step, setStep] = useState<TransferStep>('amount');
  const [transferData, setTransferData] = useState<TransferData>({
    amount: 0,
    recipient: null,
  });

  const getProgress = () => {
    switch (step) {
      case 'amount':
        return 25;
      case 'recipient':
        return 50;
      case 'confirm':
        return 75;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  const handleAmountNext = (amount: number) => {
    setTransferData({ ...transferData, amount });
    setStep('recipient');
  };

  const handleRecipientNext = (recipient: TransferData['recipient']) => {
    setTransferData({ ...transferData, recipient });
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('complete');
  };

  const handleComplete = () => {
    window.location.href = '/';
  };

  const handleBack = () => {
    switch (step) {
      case 'recipient':
        setStep('amount');
        break;
      case 'confirm':
        setStep('recipient');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header title="송금" showBackButton />
      <Layout>
        <TransferContainer>
          <ProgressBar>
            <ProgressFill progress={getProgress()} />
          </ProgressBar>

          {step === 'amount' && (
            <AmountInput
              onNext={handleAmountNext}
              initialAmount={transferData.amount}
            />
          )}

          {step === 'recipient' && (
            <RecipientSelect
              onNext={handleRecipientNext}
              onBack={handleBack}
              selectedRecipient={transferData.recipient}
            />
          )}

          {step === 'confirm' && transferData.recipient && (
            <TransferConfirm
              amount={transferData.amount}
              recipient={transferData.recipient}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}

          {step === 'complete' && transferData.recipient && (
            <TransferComplete
              amount={transferData.amount}
              recipient={transferData.recipient}
              onComplete={handleComplete}
            />
          )}
        </TransferContainer>
      </Layout>
      {step !== 'complete' && <Navigation activeTab="transfer" />}
    </>
  );
}