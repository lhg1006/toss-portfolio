import type { Preview } from '@storybook/react';
import React from 'react';
import { QueryProvider } from '../src/providers/QueryProvider';
import { GlobalStyles } from '../src/styles/GlobalStyles';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f9fafb',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Mobile (320px)',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobile2: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryProvider>
        <GlobalStyles />
        <Story />
      </QueryProvider>
    ),
  ],
};

export default preview;