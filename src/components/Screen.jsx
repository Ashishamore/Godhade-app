import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useShell } from './AppShell'
import { IconButton } from './ui'

/* Sticky, translucent screen header. The hairline only appears once the
   content has moved under it — the small cue that makes a header feel alive. */
export function ScreenHeader({ title, subtitle, back = false, actions, below, children }) {
  const { scrolled } = useShell()
  const navigate = useNavigate()

  return (
    <header
      className={[
        'sticky top-0 z-30 bg-canvas/80 pt-safe backdrop-blur-xl',
        'border-b transition-colors duration-200',
        scrolled ? 'border-line' : 'border-transparent',
      ].join(' ')}
    >
      <div className="flex min-h-14 items-center gap-2 px-4 py-2">
        {back && (
          <IconButton
            label="Go back"
            size="sm"
            onClick={() => navigate(-1)}
            className="-ml-2 bg-surface border border-line"
          >
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </IconButton>
        )}

        {children ?? (
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[19px] font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h1>
            {subtitle && <p className="truncate text-[12.5px] text-ink-3">{subtitle}</p>}
          </div>
        )}

        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </div>

      {below && <div className="px-4 pb-3">{below}</div>}
    </header>
  )
}

/** Body wrapper: consistent gutters and enough bottom room to clear the nav. */
export default function Screen({ className = '', children }) {
  return <div className={['px-4 pt-4 pb-10', className].join(' ')}>{children}</div>
}

/** Section heading with an optional trailing action. */
export function SectionTitle({ title, caption, action }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">{title}</h2>
        {caption && <p className="mt-0.5 text-[12.5px] text-ink-3">{caption}</p>}
      </div>
      {action}
    </div>
  )
}
