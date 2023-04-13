import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { INITIAL_FONT } from './constants'
import { FontProvider } from './fonts'

const root = document.querySelector<HTMLDivElement>('#root')!
createRoot(root).render(
  <MantineProvider
    theme={{ colorScheme: 'dark' }}
    withGlobalStyles
    withNormalizeCSS
  >
    <FontProvider initialFont={INITIAL_FONT}>
      <Notifications />
      <App />
    </FontProvider>
  </MantineProvider>
)
