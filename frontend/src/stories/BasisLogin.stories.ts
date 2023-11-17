import type { Meta, StoryObj } from '@storybook/vue3'
import BasisLogin from './BasisLogin.vue'
import { defineComponent, reactive } from 'vue'
import { QLayout, QPageContainer, QPage, QCard, QCardSection, QForm, QInput, QBtn } from 'quasar'
import { action } from '@storybook/addon-actions'
import { mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../../mocks/handlers'

const MockHeader = defineComponent({
  template: '<div>Mock Header</div>'
})

const MockLogoutButton = defineComponent({
  template: '<button @click="logout">Mock Logout</button>',
  methods: {
    logout() {
      action('logout')()
    }
  }
})
interface LoginProps {
  email: string
  password: string
  errorMessage: string
}
type User = { email: string; token: string } | null
export default {
  title: 'Components/BasisLogin',
  component: BasisLogin,
  argTypes: {
    email: { control: 'text', description: 'E-Mail' },
    password: { control: 'text', description: 'Passwort' },
    errorMessage: { control: 'text', description: 'Fehlermeldung' }
  },
  tags: ['autodocs'],
  decorators: [mswDecorator],
  parameters: {
    msw: handlers
  }
} as Meta<typeof BasisLogin>

const Template: StoryObj<LoginProps> = {
  args: {
    email: 'julia12345@test.com',
    password: 'password123',
    errorMessage: ''
  },
  render(args) {
    const sessionStore = reactive({
      user: null as User,
      isAuthenticated: false,
      login: action('login'),
      logout: action('logout')
    })
    const mockRouter = {
      push: action('onRouteChange')
    }
    const onLogin = () => {
      action('onLogin')(args.email, 'mockToken')
      sessionStore.isAuthenticated = true
      sessionStore.user = { email: args.email, token: 'mockToken' }
      action('onLoginSuccess')('User logged in', sessionStore.user)
    }

    return {
      components: {
        QLayout,
        QPageContainer,
        QPage,
        QCard,
        QCardSection,
        QForm,
        QInput,
        QBtn,
        BasisLogin,
        MockHeader,
        MockLogoutButton
      },
      setup() {
        return { args, onLogin, sessionStore, $router: mockRouter }
      },
      template: `
        <q-layout>
          <q-page-container>
            <q-page class="flex flex-center">
              <BasisLogin 
                :email="args.email" 
                :password="args.password" 
                :error-message="args.errorMessage" 
                @login="onLogin" 
              />
              <MockDashboard v-if="sessionStore.isAuthenticated" />
            </q-page>
          </q-page-container>
        </q-layout>
      `
    }
  }
}

export const Default: StoryObj<LoginProps> = {
  ...Template
}
