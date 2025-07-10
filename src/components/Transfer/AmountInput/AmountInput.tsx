'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Button } from '@/components/Button';

interface AmountInputProps {
  onNext: (amount: number) => void;
  initialAmount?: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  text-align: center;
`;

const AmountDisplay = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: ${theme.spacing.xl} 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['3xl']};
    min-height: 48px;
  }
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  width: 100%;
  max-width: 300px;
`;

const KeyButton = styled.button`
  background: ${theme.colors.gray[50]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${theme.colors.gray[100]};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(KeyButton)`
  grid-column: span 2;
`;

const ValidationMessage = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.error};
  margin: 0;
  text-align: center;
`;

const NextButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin-top: ${theme.spacing.lg};
`;

export const AmountInput: React.FC<AmountInputProps> = ({ onNext, initialAmount = 0 }) => {
  const [amount, setAmount] = useState(initialAmount.toString());
  const [error, setError] = useState('');

  const formatAmount = (value: string) => {
    const num = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(num)) return '0';
    return num.toLocaleString('ko-KR');
  };

  const handleKeyPress = (key: string) => {
    setError('');
    
    if (amount === '0') {
      setAmount(key);
    } else {
      const newAmount = amount.replace(/,/g, '') + key;
      if (parseInt(newAmount) <= 10000000) {
        setAmount(newAmount);
      } else {
        setError('최대 송금 한도는 1천만원입니다');
      }
    }
  };

  const handleDelete = () => {
    const cleanAmount = amount.replace(/,/g, '');
    if (cleanAmount.length > 1) {
      setAmount(cleanAmount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleClear = () => {
    setAmount('0');
    setError('');
  };

  const handleNext = () => {
    const numAmount = parseInt(amount.replace(/,/g, ''), 10);
    
    if (numAmount < 1000) {
      setError('최소 송금 금액은 1,000원입니다');
      return;
    }
    
    onNext(numAmount);
  };

  useEffect(() => {
    setAmount((prev) => formatAmount(prev));
  }, [amount]);

  const isValidAmount = () => {
    const numAmount = parseInt(amount.replace(/,/g, ''), 10);
    return numAmount >= 1000 && numAmount <= 10000000;
  };

  return (
    <Container>
      <Title>얼마를 보낼까요?</Title>
      
      <AmountDisplay>
        {amount === '0' ? '0' : `${formatAmount(amount)}원`}
      </AmountDisplay>

      {error && <ValidationMessage>{error}</ValidationMessage>}

      <Keypad>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <KeyButton key={key} onClick={() => handleKeyPress(key)}>
            {key}
          </KeyButton>
        ))}
        <KeyButton onClick={() => handleKeyPress('00')}>00</KeyButton>
        <KeyButton onClick={() => handleKeyPress('0')}>0</KeyButton>
        <KeyButton onClick={handleDelete}>←</KeyButton>
        <DeleteButton onClick={handleClear}>전체 삭제</DeleteButton>
      </Keypad>

      <NextButton
        variant="primary"
        onClick={handleNext}
        disabled={!isValidAmount()}
      >
        다음
      </NextButton>
    </Container>
  );
};