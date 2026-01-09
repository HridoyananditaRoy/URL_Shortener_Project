import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import store from "./store/slice/store.js"
import {Provider} from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  // Wrap App with QueryClientProvider to provide React Query context
 <Provider store={store}>
  <BrowserRouter>
 <QueryClientProvider client={queryClient}> 
    <App />
  </QueryClientProvider>
 </BrowserRouter>
 </Provider>
 
 
)
