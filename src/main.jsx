import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import App from './App.jsx'

function setAppHeight() {
  const vv = window.visualViewport
  const h = vv?.height || window.innerHeight
  document.documentElement.style.setProperty('--app-height', `${h}px`)
  // Keyboard heuristic: visualViewport shrinks well below layout viewport when keyboard opens
  const layoutH = window.innerHeight
  const keyboardOpen = vv ? layoutH - h > 100 : false
  document.body.classList.toggle('keyboard-open', keyboardOpen)
}
setAppHeight()
window.visualViewport?.addEventListener('resize', setAppHeight)
window.visualViewport?.addEventListener('scroll', setAppHeight)
window.addEventListener('resize', setAppHeight)
window.addEventListener('orientationchange', setAppHeight)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
