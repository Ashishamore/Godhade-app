export default function Card({ as: Tag = 'div', interactive = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={[
        'bg-surface border border-line rounded-2xl shadow-card overflow-hidden',
        interactive
          ? 'text-left w-full transition-[transform,box-shadow] duration-200 active:scale-[0.985] hover:shadow-lift'
          : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Settings-style row list. Children are <Row /> elements. */
export function RowGroup({ title, className = '', children }) {
  return (
    <section className={className}>
      {title && (
        <h3 className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
          {title}
        </h3>
      )}
      <div className="bg-surface border border-line rounded-2xl shadow-card divide-y divide-line overflow-hidden">
        {children}
      </div>
    </section>
  )
}

export function Row({ as: Tag = 'div', icon, label, value, hint, trailing, className = '', ...rest }) {
  const clickable = Tag !== 'div'
  return (
    <Tag
      className={[
        'flex w-full items-center gap-3.5 px-4 py-3.5 text-left',
        clickable ? 'transition-colors duration-150 hover:bg-muted active:bg-muted' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-ink-2">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-ink">{label}</span>
        {hint && <span className="mt-0.5 block truncate text-[13px] text-ink-3">{hint}</span>}
      </span>
      {value && <span className="shrink-0 text-[13px] text-ink-3 tnum">{value}</span>}
      {trailing}
    </Tag>
  )
}
