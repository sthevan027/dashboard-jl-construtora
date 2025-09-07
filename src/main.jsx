import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { checkDesignTokensContrast } from './lib/a11y.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Verificação de contraste dos tokens em dev
if (import.meta.env?.MODE !== 'production') {
  try { checkDesignTokensContrast(); } catch {}
}
