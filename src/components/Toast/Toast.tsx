'use client';

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  background: ${theme.colors.gray[900]};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.3s ease;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  backdrop-filter: blur(10px);
  background: ${theme.colors.gray[900]};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Toast: React.FC<ToastProps> = ({ message, duration = 2000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <ToastContainer isClosing={isClosing}>{message}</ToastContainer>;
};