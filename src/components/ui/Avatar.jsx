const SIZES = {
  xs: 'size-6 text-[9px]',
  sm: 'size-8 text-[11px]',
  md: 'size-10 text-[13px]',
  lg: 'size-12 text-[15px]',
  xl: 'size-20 text-2xl',
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

/* A small flat palette, picked deterministically so the same person is always
   the same colour. Solid fills only — no gradients anywhere in this system. */
const TINTS = ['#c2410c', '#1b4f8a', '#8a6508', '#8a3b8a', '#1b6e7a', '#15724a', '#4a5a8a']

function tintFor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997
  return TINTS[h % TINTS.length]
}

export default function Avatar({ name = '?', size = 'md', ring = false, className = '' }) {
  const tint = tintFor(name)
  return (
    <span
      aria-hidden="true"
      className={[
        'inline-grid shrink-0 place-items-center rounded-full font-semibold tracking-wide',
        SIZES[size],
        ring ? 'ring-2 ring-surface' : '',
        className,
      ].join(' ')}
      style={{
        background: `color-mix(in oklab, ${tint} 15%, transparent)`,
        color: tint,
      }}
    >
      {initials(name)}
    </span>
  )
}

export function AvatarStack({ names = [], size = 'sm', max = 3, extra = 0 }) {
  const shown = names.slice(0, max)
  const more = extra || Math.max(0, names.length - max)
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((n) => (
          <Avatar key={n} name={n} size={size} ring />
        ))}
      </div>
      {more > 0 && (
        <span className="ml-2 text-[12px] font-medium text-ink-3 tnum">
          +{more > 999 ? (more / 1000).toFixed(1) + 'k' : more}
        </span>
      )}
    </div>
  )
}
