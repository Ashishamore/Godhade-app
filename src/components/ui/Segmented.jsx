/** iOS-style segmented control. `options` is [{ id, label, count? }]. */
export default function Segmented({ options, value, onChange, className = '' }) {
  const index = Math.max(0, options.findIndex((o) => o.id === value))

  return (
    <div
      role="tablist"
      className={[
        'relative grid rounded-xl bg-muted p-1 select-none',
        className,
      ].join(' ')}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {/* Sliding thumb — one element that moves, so the motion reads as physical. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-[0.625rem] bg-surface shadow-card transition-transform duration-300 ease-[var(--ease-out-soft)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((o) => (
        <button
          key={o.id}
          role="tab"
          type="button"
          aria-selected={o.id === value}
          onClick={() => onChange(o.id)}
          className={[
            'relative z-10 flex h-9 items-center justify-center gap-1.5 rounded-[0.625rem]',
            'text-[13px] font-medium transition-colors duration-200',
            o.id === value ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
          ].join(' ')}
        >
          {o.label}
          {o.count != null && <span className="text-[11px] text-ink-3 tnum">{o.count}</span>}
        </button>
      ))}
    </div>
  )
}
