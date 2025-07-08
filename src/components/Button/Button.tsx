'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  border: none;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          height: 32px;
        `;
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
          height: 48px;
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.md};
          height: 40px;
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[700]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[200]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray[300]};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          border: 1px solid ${theme.colors.primary[600]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[800]};
          }
        `;
    }
  }}
  
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}
    
  ${({ fullWidth }) =>
    fullWidth &&
    `
      width: 100%;
    `}
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 44px;
    font-size: ${theme.typography.fontSize.md};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  children,
  onClick,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};