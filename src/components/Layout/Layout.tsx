'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
  
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
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing.xl};
  }
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};