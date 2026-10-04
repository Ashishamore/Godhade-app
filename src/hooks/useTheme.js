import { useCallback, useEffect, useState } from 'react'

const KEY = 'godhade.theme' // 'light' | 'dark' | 'system'
const query = () => window.matchMedia('(prefers-color-scheme: dark)')

function read() {
  try {
    return localStorage.getItem(KEY) || 'system'
  } catch {
    return 'system'
  }
}

function apply(mode) {
  const dark = mode === 'dark' || (mode === 'system' && query().matches)
  document.documentElement.classList.toggle('dark', dark)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#09090b' : '#ffffff')
}

export default function useTheme() {
  const [mode, setMode] = useState(read)

  useEffect(() => {
    apply(mode)
    try {
      localStorage.setItem(KEY, mode)
    } catch {
      /* private browsing — the theme just won't persist */
    }
    if (mode !== 'system') return
    const mq = query()
    const onChange = () => apply('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  const isDark =
    mode === 'dark' || (mode === 'system' && typeof window !== 'undefined' && query().matches)

  const toggle = useCallback(() => setMode(isDark ? 'light' : 'dark'), [isDark])

  return { mode, setMode, isDark, toggle }
}
