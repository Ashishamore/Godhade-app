import { createContext, useContext } from 'react'
import useTheme from '../hooks/useTheme'

/* The theme is read in two places that are not on the same branch of the tree
   (the side rail inside the app, and the device toolbar outside it), so it
   lives in a provider above both. */
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const theme = useTheme()
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useAppTheme = () => useContext(ThemeContext)
