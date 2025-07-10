'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing.sm} 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const TabItem = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.effects.transition};
  min-width: 60px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
  
  ${(props) => props.active && `
    color: ${theme.colors.toss.blue};
  `}
`;

const TabIcon = styled.div<{ active: boolean }>`
  font-size: ${theme.typography.fontSize.xl};
  transition: ${theme.effects.transition};
  
  ${(props) => props.active && `
    transform: scale(1.1);
  `}
`;

const TabLabel = styled.span<{ active: boolean }>`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${(props) => props.active ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  color: ${(props) => props.active ? theme.colors.toss.blue : theme.colors.gray[600]};
`;

const tabs = [
  { id: 'home', label: '홈', icon: '🏠' },
  { id: 'transfer', label: '송금', icon: '💸' },
  { id: 'pay', label: '결제', icon: '💳' },
  { id: 'invest', label: '투자', icon: '📈' },
  { id: 'more', label: '전체', icon: '☰' },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  activeTab = 'home', 
  onTabChange 
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
    
    // 실제 네비게이션 로직
    switch (tabId) {
      case 'home':
        window.location.href = '/';
        break;
      case 'transfer':
        window.location.href = '/transfer';
        break;
      case 'pay':
        console.log('결제 페이지로 이동');
        break;
      case 'invest':
        console.log('투자 페이지로 이동');
        break;
      case 'more':
        console.log('전체 메뉴로 이동');
        break;
    }
  };

  return (
    <NavigationContainer>
      <TabList>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            active={currentTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            <TabIcon active={currentTab === tab.id}>
              {tab.icon}
            </TabIcon>
            <TabLabel active={currentTab === tab.id}>
              {tab.label}
            </TabLabel>
          </TabItem>
        ))}
      </TabList>
    </NavigationContainer>
  );
};