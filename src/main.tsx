import { ErrorBoundary } from 'react-error-boundary'

import './index.css'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import { theme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<div>something went wrong</div>}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
