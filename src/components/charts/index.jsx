/* ---------------------------------------------------------------------------
   Hand-rolled SVG charts.

   No chart library: the shapes here are simple enough that a dependency would
   cost more than it saves, and these inherit the theme tokens directly so they
   work in light and dark without a second palette.

   Flat fills only — no gradients.
--------------------------------------------------------------------------- */

/** Tiny trend line for KPI tiles. */
export function Sparkline({ values, tint = 'var(--c-brand)', className = '' }) {
  if (!values?.length) return null
  const w = 100
  const h = 28
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - ((v - min) / span) * (h - 4) - 2,
  ])
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={d} fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Grouped vertical bars — two series per category. */
export function GroupedBars({ data, series, height = 190, format = (v) => v }) {
  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))) || 1
  const ticks = [0, 0.5, 1]

  return (
    <div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-0.5 text-[10px] text-ink-3 tnum" style={{ height }}>
          {[...ticks].reverse().map((t) => (
            <span key={t}>{format(Math.round(max * t))}</span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute inset-x-0 border-t border-line"
              style={{ bottom: `${t * 100}%` }}
              aria-hidden="true"
            />
          ))}

          <div className="relative flex items-end gap-1.5" style={{ height }}>
            {data.map((d) => (
              <div key={d.m} className="flex h-full min-w-0 flex-1 items-end justify-center gap-[3px]">
                {series.map((s) => (
                  <div
                    key={s.key}
                    title={`${d.m} · ${s.label}: ${format(d[s.key])}`}
                    className="w-full max-w-[14px] rounded-t-[3px] transition-opacity hover:opacity-80"
                    style={{ height: `${(d[s.key] / max) * 100}%`, background: s.tint }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex gap-3 pl-10">
        {data.map((d) => (
          <span key={d.m} className="min-w-0 flex-1 text-center text-[10.5px] text-ink-3">
            {d.m}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 pl-10">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: s.tint }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Horizontal ranked bars — good for "top selling courses". */
export function RankedBars({ data, tint = 'var(--c-brand)', format = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value)) || 1
  return (
    <ul className="space-y-2.5">
      {data.map((d) => (
        <li key={d.id} className="flex items-center gap-3">
          <span className="w-16 shrink-0 truncate text-[12.5px] text-ink-2">{d.label}</span>
          <span className="h-5 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-muted">
            <span
              className="block h-full rounded-[3px]"
              style={{ width: `${(d.value / max) * 100}%`, background: d.tint ?? tint }}
            />
          </span>
          <span className="w-9 shrink-0 text-right text-[12.5px] font-semibold text-ink tnum">
            {format(d.value)}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Donut for revenue split. Stroke-dasharray arcs, no gradients. */
export function Donut({ data, size = 148, thickness = 20, centerLabel, centerValue }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--c-muted)" strokeWidth={thickness} />
        {data.map((d) => {
          const len = (d.value / total) * c
          const el = (
            <circle
              key={d.id}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.tint}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return el
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="text-[17px] font-semibold text-ink tnum">{centerValue}</span>
          <span className="mt-0.5 text-[11px] text-ink-3">{centerLabel}</span>
        </div>
      )}
    </div>
  )
}

/** Thin progress meter used across both apps. */
export function Meter({ value, max = 100, tint = 'var(--c-brand)', className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <span className={['block h-1.5 overflow-hidden rounded-full bg-muted', className].join(' ')}>
      <span className="block h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, background: tint }} />
    </span>
  )
}
