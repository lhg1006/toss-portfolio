'use client';

import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize.md};
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background-color: ${theme.colors.gray[50]};
        color: ${theme.colors.gray[900]};
        min-height: 100vh;
      }

      button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
        outline: none;
        
        &:focus-visible {
          outline: 2px solid ${theme.colors.primary[500]};
          outline-offset: 2px;
        }
      }

      input {
        font-family: inherit;
        border: none;
        outline: none;
        
        &:focus-visible {
          outline: 2px solid ${theme.colors.primary[500]};
          outline-offset: 2px;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul, ol {
        list-style: none;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      @media (max-width: ${theme.breakpoints.mobile}) {
        html {
          font-size: 14px;
        }
      }
    `}
  />
);