const TONES = {
  neutral: 'bg-muted text-ink-2',
  brand: 'bg-brand-soft text-brand',
  positive: 'bg-positive-soft text-positive',
  warning: 'bg-warning-soft text-warning',
  critical: 'bg-critical-soft text-critical',
  invert: 'bg-ink text-canvas',
  glass: 'bg-black/35 text-white backdrop-blur-md',
}

export default function Badge({ tone = 'neutral', icon, className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5',
        'text-[11px] font-semibold tracking-[0.01em] whitespace-nowrap',
        TONES[tone],
        className,
      ].join(' ')}
    >
      {icon}
      {children}
    </span>
  )
}

/** Small count bubble for nav items and unread rows. */
export function Dot({ count, className = '' }) {
  if (!count) return null
  return (
    <span
      className={[
        'grid min-w-4 place-items-center rounded-full bg-critical px-1',
        'text-[10px] font-bold leading-4 text-white tnum',
        className,
      ].join(' ')}
    >
      {count > 9 ? '9+' : count}
    </span>
  )
}
