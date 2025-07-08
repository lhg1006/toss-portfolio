import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {
      nextConfigPath: '../next.config.ts'
    }
  },
  "staticDirs": [
    "../public"
  ],
  "typescript": {
    "reactDocgen": "react-docgen-typescript"
  },
  "babel": async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      "@emotion/babel-plugin"
    ]
  })
};
export default config;