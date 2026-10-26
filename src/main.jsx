import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initAutoTracking } from './utils/analytics'

// Google Analytics 4 B2B Otomatik Dönüşüm Takipçisini Başlat
initAutoTracking();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
