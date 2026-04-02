import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
  import { QueryClient, QueryClientProvider ,  } from '@tanstack/react-query'
import { BrowserRouter } from "react-router";
import { Toaster } from './components/ui/sonner'
  const Queryclient = new QueryClient({
defaultOptions:{
  queries :{
    staleTime: 60 * 1000
  }
}
  })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={Queryclient}>
      <BrowserRouter>
      <Toaster/>
      <App />
      
      </BrowserRouter>
   
    </QueryClientProvider>
   
  </StrictMode>,
)
