'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Button } from '@/components/Button';
import { TransferData } from '@/app/transfer/page';

interface RecipientSelectProps {
  onNext: (recipient: TransferData['recipient']) => void;
  onBack: () => void;
  selectedRecipient: TransferData['recipient'];
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

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  transition: ${theme.effects.transition};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.toss.blue};
  }
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[700]};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const RecipientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const RecipientItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${(props) => props.selected ? theme.colors.toss.blue : theme.colors.white};
  color: ${(props) => props.selected ? theme.colors.white : theme.colors.gray[900]};
  border: 1px solid ${(props) => props.selected ? theme.colors.toss.blue : theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    background: ${(props) => props.selected ? theme.colors.toss.blue : theme.colors.gray[50]};
    border-color: ${theme.colors.toss.blue};
  }
`;

const RecipientAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-right: ${theme.spacing.md};
`;

const RecipientInfo = styled.div`
  flex: 1;
`;

const RecipientName = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.xs};
`;

const RecipientBank = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.8;
`;

const NextButton = styled(Button)`
  width: 100%;
  margin-top: ${theme.spacing.xl};
`;

const mockRecipients = [
  {
    id: '1',
    name: '김토스',
    bank: '토스뱅크',
    accountNumber: '100012345678',
    isRecent: true,
  },
  {
    id: '2',
    name: '이토스',
    bank: '토스뱅크',
    accountNumber: '100087654321',
    isRecent: true,
  },
  {
    id: '3',
    name: '박토스',
    bank: '카카오뱅크',
    accountNumber: '3333012345678',
    isRecent: false,
  },
  {
    id: '4',
    name: '최토스',
    bank: '신한은행',
    accountNumber: '110123456789',
    isRecent: false,
  },
  {
    id: '5',
    name: '정토스',
    bank: '국민은행',
    accountNumber: '012345678901',
    isRecent: false,
  },
];

export const RecipientSelect: React.FC<RecipientSelectProps> = ({
  onNext,
  onBack,
  selectedRecipient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(selectedRecipient);

  const recentRecipients = mockRecipients.filter((r) => r.isRecent);
  const allRecipients = mockRecipients.filter((r) => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (recipient: typeof mockRecipients[0]) => {
    setSelected(recipient);
  };

  const handleNext = () => {
    if (selected) {
      onNext(selected);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>누구에게 보낼까요?</Title>
      </Header>

      <SearchInput
        type="text"
        placeholder="이름 또는 은행명으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!searchTerm && recentRecipients.length > 0 && (
        <Section>
          <SectionTitle>최근 보낸 사람</SectionTitle>
          <RecipientList>
            {recentRecipients.map((recipient) => (
              <RecipientItem
                key={recipient.id}
                selected={selected?.id === recipient.id}
                onClick={() => handleSelect(recipient)}
              >
                <RecipientAvatar>{recipient.name[0]}</RecipientAvatar>
                <RecipientInfo>
                  <RecipientName>{recipient.name}</RecipientName>
                  <RecipientBank>
                    {recipient.bank} {recipient.accountNumber.slice(-4)}
                  </RecipientBank>
                </RecipientInfo>
              </RecipientItem>
            ))}
          </RecipientList>
        </Section>
      )}

      <Section>
        <SectionTitle>{searchTerm ? '검색 결과' : '전체 연락처'}</SectionTitle>
        <RecipientList>
          {allRecipients.map((recipient) => (
            <RecipientItem
              key={recipient.id}
              selected={selected?.id === recipient.id}
              onClick={() => handleSelect(recipient)}
            >
              <RecipientAvatar>{recipient.name[0]}</RecipientAvatar>
              <RecipientInfo>
                <RecipientName>{recipient.name}</RecipientName>
                <RecipientBank>
                  {recipient.bank} {recipient.accountNumber.slice(-4)}
                </RecipientBank>
              </RecipientInfo>
            </RecipientItem>
          ))}
        </RecipientList>
      </Section>

      <NextButton
        variant="primary"
        onClick={handleNext}
        disabled={!selected}
      >
        다음
      </NextButton>
    </Container>
  );
};