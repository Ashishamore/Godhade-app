/* Shared building blocks for the admin console — flat surfaces, hairline
   borders, no gradients. Deliberately plain so data stays the loudest thing. */

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Sparkline } from '../charts'

export function Panel({ title, caption, action, className = '', children, bodyClass = 'p-4' }) {
  return (
    <section className={['rounded-xl border border-line bg-surface', className].join(' ')}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
            {caption && <p className="mt-0.5 truncate text-[12px] text-ink-3">{caption}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  )
}

export function Kpi({ label, value, delta, spark, tone }) {
  const up = delta >= 0
  const good = tone === 'warning' ? !up : up
  const Arrow = up ? TrendingUp : TrendingDown

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="truncate text-[12px] text-ink-3">{label}</p>
      <p className="mt-1.5 text-[23px] font-semibold tracking-[-0.02em] text-ink tnum">{value}</p>

      <div className="mt-2.5 flex items-end justify-between gap-3">
        <span
          className={[
            'inline-flex items-center gap-1 text-[12px] font-semibold tnum',
            good ? 'text-positive' : 'text-critical',
          ].join(' ')}
        >
          <Arrow className="size-3.5" strokeWidth={2.4} />
          {Math.abs(delta)}%
        </span>
        {spark && (
          <Sparkline
            values={spark}
            tint={good ? 'var(--c-positive)' : 'var(--c-critical)'}
            className="h-7 w-20"
          />
        )}
      </div>
    </div>
  )
}

const PILL = {
  pending: 'bg-warning-soft text-warning',
  approved: 'bg-brand-soft text-brand',
  confirmed: 'bg-positive-soft text-positive',
  captured: 'bg-positive-soft text-positive',
  attended: 'bg-positive-soft text-positive',
  rejected: 'bg-critical-soft text-critical',
  failed: 'bg-critical-soft text-critical',
  active: 'bg-positive-soft text-positive',
  lead: 'bg-muted text-ink-2',
  draft: 'bg-muted text-ink-2',
  published: 'bg-positive-soft text-positive',
  hidden: 'bg-muted text-ink-2',
  open: 'bg-brand-soft text-brand',
  completed: 'bg-muted text-ink-2',
}

export function Pill({ status, children }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize',
        PILL[status] ?? 'bg-muted text-ink-2',
      ].join(' ')}
    >
      {children ?? status}
    </span>
  )
}

/** Horizontally scrollable table with a sticky header row. */
export function Table({ head, children }) {
  return (
    <div className="no-scrollbar overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {head.map((h) => (
              <th
                key={h.key ?? h.label}
                style={h.width ? { width: h.width } : undefined}
                className={[
                  'whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3',
                  h.align === 'right' ? 'text-right' : '',
                ].join(' ')}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ align, className = '', children, ...rest }) {
  return (
    <td
      className={[
        'px-4 py-3 text-[13px] text-ink',
        align === 'right' ? 'text-right' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </td>
  )
}

export function Toolbar({ children }) {
  return <div className="mb-4 flex flex-wrap items-center gap-2">{children}</div>
}

export function FilterChip({ active, onClick, children, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors',
        active
          ? 'border-brand bg-brand-soft text-brand'
          : 'border-line bg-surface text-ink-2 hover:bg-muted',
      ].join(' ')}
    >
      {children}
      {count != null && <span className="text-[11px] text-ink-3 tnum">{count}</span>}
    </button>
  )
}
