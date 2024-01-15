import type { Meta, StoryObj } from '@storybook/vue3'

import CreatLink from '../components/CreateLink.vue'

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CreateLink',
  component: CreateLink,
  render: (args: any) => ({
    components: { CreateLink },
    setup() {
      return { args }
    },
    template: 
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof CreateLink>

export default meta
type Story = StoryObj<typeof meta>
