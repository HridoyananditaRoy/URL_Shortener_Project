import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  // Wrap App with QueryClientProvider to provide React Query context
  <QueryClientProvider client={queryClient}> 
    <App />
  </QueryClientProvider>,
)
