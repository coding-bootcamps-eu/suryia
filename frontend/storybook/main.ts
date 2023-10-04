import { StorybookConfig } from '@storybook/types'

const config: StorybookConfig = {
  // Required
  framework: '@storybook/vue3',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-essentials'],
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public']
}

export default config
