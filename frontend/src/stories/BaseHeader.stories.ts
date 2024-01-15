import type { Meta, StoryObj } from '@storybook/vue3'
import Header from './BaseHeader.vue'
import { userSessionStore } from '@/store/session'
import { QLayout, QHeader, QPageContainer } from 'quasar'
interface HeaderProps {
  isAuthenticated: boolean
  userEmail: string | null
}

export default {
  title: 'Components/Header',
  component: { Header, QLayout, QHeader },
  argTypes: {
    logout: { action: 'logout' },
    goToRegister: { action: 'goToRegister' }
  },
  tags: ['autodocs']
} as Meta<typeof Header>

const Template: StoryObj<HeaderProps> = {
  args: {
    isAuthenticated: false,
    userEmail: null
  },
  render: (args, { argTypes }) => ({
    components: { Header },
    setup() {
      const sessionStore = userSessionStore()

      if (args.isAuthenticated) {
        sessionStore.login(args.userEmail as string, 'dummy-token')
      } else {
        sessionStore.logout()
      }

      return { args }
    },
    template: `
    <q-layout>
      <Header
        :is-authenticated="args.isAuthenticated"
        :user-email="args.userEmail"
        @logout="args.logout"
        @goToRegister="args.goToRegister"
      />
      </q-layout>
      `
  })
}

export const LoggedIn: StoryObj<HeaderProps> = {
  ...Template,
  args: {
    isAuthenticated: true,
    userEmail: 'user@example.com'
  }
}

export const LoggedOut: StoryObj<HeaderProps> = {
  ...Template
}
