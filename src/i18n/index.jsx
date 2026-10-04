import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, strings } from './strings'

export { LANGUAGES }

const KEY = 'godhade.lang'
const Ctx = createContext(null)

function load() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && strings[saved]) return saved
  } catch {
    /* private browsing */
  }
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  /** t('nav.home') — falls back to English, then to the key itself. */
  const t = useCallback(
    (key) => strings[lang]?.[key] ?? strings.en[key] ?? key,
    [lang],
  )

  /** Content objects carry {en, hi, mr}; pick the active one. */
  const pick = useCallback(
    (field) => (typeof field === 'string' ? field : (field?.[lang] ?? field?.en ?? '')),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, t, pick])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export default function useI18n() {
  return useContext(Ctx)
}
