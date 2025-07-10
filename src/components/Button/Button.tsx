'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  font-weight: ${theme.typography.fontWeight.bold};
  border-radius: ${theme.borderRadius.lg};
  transition: ${theme.effects.transition};
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
          background: ${theme.colors.backgrounds.glassBlur};
          color: ${theme.colors.gray[700]};
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: ${theme.shadows.toss.card};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.white};
            box-shadow: ${theme.shadows.toss.button};
            transform: translateY(-2px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.toss.blue};
          border: 2px solid ${theme.colors.toss.blue};
          backdrop-filter: blur(5px);
          
          &:hover:not(:disabled) {
            background: ${theme.colors.toss.lightBlue};
            border-color: ${theme.colors.toss.blue};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.toss.button};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.gray[600]};
          border: none;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.gray[100]};
            color: ${theme.colors.gray[800]};
          }
          
          &:active:not(:disabled) {
            background: ${theme.colors.gray[200]};
          }
        `;
      default:
        return `
          background: ${theme.colors.toss.blue};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.toss.button};
          border: none;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary[700]};
            box-shadow: ${theme.shadows.toss.float};
            transform: translateY(-2px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
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