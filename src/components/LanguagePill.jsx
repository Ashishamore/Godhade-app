import { Languages } from 'lucide-react'
import useI18n, { LANGUAGES } from '../i18n'

/** Compact language cycler for the app header: EN → HI → MR. */
export default function LanguagePill({ className = '' }) {
  const { lang, setLang } = useI18n()
  const current = LANGUAGES.find((l) => l.id === lang) ?? LANGUAGES[0]

  const cycle = () => {
    const i = LANGUAGES.findIndex((l) => l.id === lang)
    setLang(LANGUAGES[(i + 1) % LANGUAGES.length].id)
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Language: ${current.label}`}
      className={[
        'inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5',
        'text-[12.5px] font-semibold text-ink-2 transition-colors active:bg-muted',
        className,
      ].join(' ')}
    >
      <Languages className="size-4" strokeWidth={2} />
      {current.short}
    </button>
  )
}
