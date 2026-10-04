import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n'
import { StudentProvider } from './hooks/useStudent'
import { ViewModeProvider } from './hooks/useViewMode'
import { ThemeProvider } from './components/theme'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <ViewModeProvider>
            <StudentProvider>
              <App />
            </StudentProvider>
          </ViewModeProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
