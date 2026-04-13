import { ErrorBoundary } from 'react-error-boundary'

import './index.css'
import './styles/tour.css'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { theme } from './theme'

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK_API !== 'true') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // Service Worker Registration
  return worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unmocked requests (like assets)
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        </ErrorBoundary>
      </ThemeProvider>
    </StrictMode>,
  )
})
