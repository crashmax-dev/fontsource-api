import { MantineProvider } from '@mantine/core'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const root = document.querySelector<HTMLDivElement>('#root')!
createRoot(root).render(
  <MantineProvider
    theme={{ colorScheme: 'dark' }}
    withGlobalStyles
    withNormalizeCSS
  >
    <App />
  </MantineProvider>
)
