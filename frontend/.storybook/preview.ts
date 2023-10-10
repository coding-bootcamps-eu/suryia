import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import { setup } from '@storybook/vue3'
import { Quasar } from 'quasar'
import type { Preview } from '@storybook/vue3'

setup((app) => {
  app.use(Quasar, {})
})

const preview: Preview = {
  parameters: {
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
