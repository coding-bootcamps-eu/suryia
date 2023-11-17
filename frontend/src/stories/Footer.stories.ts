import type { Meta, StoryObj } from '@storybook/vue3'
import Footer from './footer.vue'

export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs']
} as Meta<typeof Footer>

const Template = (args: any) => ({
  components: { Footer },
  setup() {
    return { args }
  },
  template: '<Footer v-bind="args" />'
})

export const Default = Template.bind({})
