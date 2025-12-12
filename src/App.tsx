import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './app/router'
import { SolarProvider } from '@solar-icons/react';

function App() {
  return (
    <>
      <SolarProvider
        value={{ size: '20', color: 'var(--color-gray-400)', weight: 'Linear' }}
      >
        <RouterProvider router={router} />
      </SolarProvider>
    </>
  )
}

export default App
