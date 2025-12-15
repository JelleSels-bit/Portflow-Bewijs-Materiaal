import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/global.css'
import {HeroUIProvider} from '@heroui/react'
import Navbar from './navigation/navbar.tsx'
import {BrowserRouter} from 'react-router'
import Routing from './navigation/routing.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AppProvider} from './context/SettingsContext.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <HeroUIProvider>
        <BrowserRouter>
        <Navbar></Navbar>
          <QueryClientProvider client={queryClient}>
            <Routing></Routing>
          </QueryClientProvider>
        </BrowserRouter>
      </HeroUIProvider>
    </AppProvider>
  </StrictMode>,



)


