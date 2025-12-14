import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import './App.css'
import { router } from './app/router'
import { SolarProvider } from '@solar-icons/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolarProvider
        value={{ size: '20', color: 'var(--color-gray-400)', weight: 'Linear' }}
      >
        <RouterProvider router={router} />
        <Toaster position="top-right" expand={false} richColors closeButton />
        <ReactQueryDevtools initialIsOpen={false} />
      </SolarProvider>
    </QueryClientProvider>
  )
}

export default App
