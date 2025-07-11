'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
}

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing.lg};
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ scrolled }) => scrolled ? 'auto' : 'none'};
  opacity: ${({ scrolled }) => scrolled ? 1 : 0};
  transform: ${({ scrolled }) => scrolled ? 'translateY(0)' : 'translateY(-10px)'};
  
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
    height: 56px;
  }
`;

const HeaderLeft = styled.div`
  position: absolute;
  left: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    left: ${theme.spacing.md};
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.effects.transition};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateX(-2px);
  }
  
  &:active {
    transform: translateX(0) scale(0.95);
  }
`;

const BackIcon = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.gray[700]};
  line-height: 1;
`;

const HeaderTitle = styled.h1`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.md};
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    right: ${theme.spacing.md};
  }
`;

const StatusBar = styled.div`
  height: env(safe-area-inset-top, 0px);
  background: transparent;
`;

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
  rightContent,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <>
      <StatusBar />
      <HeaderContainer scrolled={scrolled}>
        {showBackButton && (
          <HeaderLeft>
            <BackButton onClick={handleBackClick}>
              <BackIcon>←</BackIcon>
            </BackButton>
          </HeaderLeft>
        )}
        
        {title && (
          <HeaderTitle>
            {title}
          </HeaderTitle>
        )}
        
        {rightContent && (
          <HeaderRight>
            {rightContent}
          </HeaderRight>
        )}
      </HeaderContainer>
    </>
  );
};