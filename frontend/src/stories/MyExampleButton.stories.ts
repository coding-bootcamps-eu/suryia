import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

export default {
  title: 'ExampleButton',
  component: Button,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' }
  },
  args: { primary: false }
} as Meta<typeof Button>

export const Primary: StoryObj = {
  args: {
    primary: true,
    label: 'Button'
  }
}

export const Secondary: StoryObj = {
  args: {
    primary: false,
    label: 'Button'
  }
}
