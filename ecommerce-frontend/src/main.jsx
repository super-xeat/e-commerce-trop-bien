import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { AuthProvider } from './context/authcontext';
import { CartProvider } from './context/cartcontext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
)
