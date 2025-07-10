'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgrounds.primary};
  position: relative;
  
  /* 토스 스타일 글래스 오버레이 */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(49, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(49, 130, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  
  /* 토스 스타일 글래스 컨테이너 */
  background: ${theme.colors.backgrounds.glass};
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.toss.glass};
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: calc(60px + ${theme.spacing.md}); /* Header height + margin */
  margin-bottom: ${theme.spacing.md};
  padding-bottom: 100px; /* 하단 네비게이션을 위한 공간 */
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
    padding-bottom: 100px;
    margin-top: calc(60px + ${theme.spacing.lg});
    margin-bottom: ${theme.spacing.lg};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing.xl};
    padding-bottom: 100px;
    margin-top: calc(60px + ${theme.spacing.xl});
    margin-bottom: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: calc(56px + ${theme.spacing.sm}); /* Mobile header height */
    margin-bottom: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.lg};
    padding-bottom: 100px;
  }
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};