'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  padding?: 'small' | 'medium' | 'large';
  shadow?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all 0.2s ease-in-out;
  
  ${({ padding }) => {
    switch (padding) {
      case 'small':
        return `padding: ${theme.spacing.sm};`;
      case 'large':
        return `padding: ${theme.spacing.xl};`;
      default:
        return `padding: ${theme.spacing.md};`;
    }
  }}
  
  ${({ shadow }) =>
    shadow &&
    `
      box-shadow: ${theme.shadows.md};
    `}
    
  ${({ hoverable }) =>
    hoverable &&
    `
      cursor: pointer;
      
      &:hover {
        box-shadow: ${theme.shadows.lg};
        transform: translateY(-2px);
      }
    `}
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
  }
`;

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'medium',
  shadow = true,
  hoverable = false,
  onClick,
}) => {
  return (
    <StyledCard
      padding={padding}
      shadow={shadow}
      hoverable={hoverable}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};