import { type Preview, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../mocks/handlers'
import type { App } from 'vue'
import {
  Quasar,
  QLayout,
  QHeader,
  QForm,
  QCard,
  QInput,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon
} from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/animate/fadeInUp.css'
import '@quasar/extras/animate/fadeOutDown.css'
import '@quasar/extras/animate/fadeInRight.css'
import '@quasar/extras/animate/fadeOutRight.css'
import '@quasar/extras/roboto-font/roboto-font.css'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  app.use(Quasar, {
    components: {
      QLayout,
      QHeader,
      QInput,
      QDrawer,
      QPageContainer,
      QPage,
      QForm,
      QCard,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon
    }
  })
})

initialize()

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    msw: handlers,
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
