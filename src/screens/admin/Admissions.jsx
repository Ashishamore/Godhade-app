import { useMemo, useState } from 'react'
import {
  AlertTriangle, Check, FileCheck2, FileX2, MapPin, Phone, Repeat, X,
} from 'lucide-react'
import { applications as seed } from '../../data/admin'
import { batchById, dateRange } from '../../data/catalog'
import { FilterChip, Panel, Pill, Table, Td, Toolbar } from '../../components/admin/ui'

const DISTANCE_RULE = 60 // km — closer than this and they become local competition

export default function Admissions() {
  const [rows, setRows] = useState(seed)
  const [filter, setFilter] = useState('pending')
  const [open, setOpen] = useState(null)

  const counts = useMemo(
    () =>
      rows.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] ?? 0) + 1
        acc.all = (acc.all ?? 0) + 1
        return acc
      }, {}),
    [rows],
  )

  const list = filter === 'all' ? rows : rows.filter((r) => r.status === filter)

  const decide = (id, status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    setOpen(null)
  }

  return (
    <div className="space-y-4">
      <Toolbar>
        {['pending', 'approved', 'confirmed', 'rejected', 'all'].map((f) => (
          <FilterChip key={f} active={filter === f} onClick={() => setFilter(f)} count={counts[f] ?? 0}>
            <span className="capitalize">{f}</span>
          </FilterChip>
        ))}
      </Toolbar>

      <Panel
        title="Batch applications"
        caption={`Approve only applicants beyond ${DISTANCE_RULE} km of Murgud`}
        bodyClass=""
      >
        <Table
          head={[
            { label: 'Applicant' },
            { label: 'Batch' },
            { label: 'District' },
            { label: 'Distance', align: 'right' },
            { label: 'Aadhaar' },
            { label: 'Status' },
            { label: '', align: 'right' },
          ]}
        >
          {list.map((a) => {
            const tooClose = a.distanceKm < DISTANCE_RULE
            return (
              <tr key={a.id} className="cursor-pointer hover:bg-muted" onClick={() => setOpen(a)}>
                <Td>
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{a.name}</span>
                    {a.repeater && (
                      <span className="inline-flex items-center gap-1 rounded bg-info-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-info">
                        <Repeat className="size-3" strokeWidth={2.4} />
                        repeater
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] text-ink-3 tnum">{a.phone}</span>
                </Td>
                <Td className="text-ink-2">{batchById(a.batch)?.code ?? a.batch}</Td>
                <Td className="text-ink-2">{a.district}</Td>
                <Td align="right">
                  <span
                    className={[
                      'inline-flex items-center gap-1 tnum',
                      tooClose ? 'font-semibold text-critical' : 'text-ink-2',
                    ].join(' ')}
                  >
                    {tooClose && <AlertTriangle className="size-3.5" strokeWidth={2.4} />}
                    {a.distanceKm} km
                  </span>
                </Td>
                <Td>
                  {a.aadhaar === 'uploaded' ? (
                    <span className="inline-flex items-center gap-1 text-[12.5px] text-positive">
                      <FileCheck2 className="size-4" strokeWidth={2.1} />
                      uploaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[12.5px] text-critical">
                      <FileX2 className="size-4" strokeWidth={2.1} />
                      missing
                    </span>
                  )}
                </Td>
                <Td>
                  <Pill status={a.status} />
                </Td>
                <Td align="right">
                  {a.status === 'pending' && (
                    <span className="inline-flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => decide(a.id, 'approved')}
                        className="grid size-7 place-items-center rounded-md bg-brand-soft text-brand hover:brightness-95"
                        aria-label="Approve"
                      >
                        <Check className="size-4" strokeWidth={2.6} />
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(a.id, 'rejected')}
                        className="grid size-7 place-items-center rounded-md bg-critical-soft text-critical hover:brightness-95"
                        aria-label="Reject"
                      >
                        <X className="size-4" strokeWidth={2.6} />
                      </button>
                    </span>
                  )}
                </Td>
              </tr>
            )
          })}
        </Table>

        {list.length === 0 && (
          <p className="px-4 py-10 text-center text-[13px] text-ink-3">Nothing in this view.</p>
        )}
      </Panel>

      {/* ------------------------------------------------- review drawer --- */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="animate-fade-in relative flex h-full w-full max-w-[420px] flex-col border-l border-line bg-surface">
            <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-[16px] font-semibold tracking-[-0.015em] text-ink">
                  {open.name}
                </h2>
                <p className="mt-0.5 text-[12.5px] text-ink-3 tnum">
                  {open.id} · applied {open.applied}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-ink-2 hover:bg-muted"
              >
                <X className="size-[18px]" strokeWidth={2.1} />
              </button>
            </header>

            <div className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              {open.distanceKm < DISTANCE_RULE && (
                <div className="flex gap-2.5 rounded-lg border border-critical/30 bg-critical-soft px-3.5 py-3">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-critical" strokeWidth={2.2} />
                  <p className="text-[12.5px] leading-relaxed text-critical">
                    Only {open.distanceKm} km from Murgud — inside your {DISTANCE_RULE} km rule.
                    Approving builds competition near the unit.
                  </p>
                </div>
              )}

              <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line">
                {[
                  ['Batch', batchById(open.batch)?.code],
                  ['Dates', batchById(open.batch) ? dateRange(batchById(open.batch).start, batchById(open.batch).end) : '—'],
                  ['Phone', open.phone],
                  ['District', open.district],
                  ['Distance', `${open.distanceKm} km`],
                  ['Repeat attendee', open.repeater ? 'Yes' : 'No'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 px-3.5 py-2.5">
                    <dt className="text-[12px] text-ink-3">{k}</dt>
                    <dd className="truncate text-[13px] font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <section>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                  Identity document
                </h3>
                {open.aadhaar === 'uploaded' ? (
                  <div className="overflow-hidden rounded-lg border border-line">
                    {/* Stand-in for the uploaded scan — access-controlled in production. */}
                    <div className="grid h-40 place-items-center bg-muted">
                      <div className="text-center">
                        <FileCheck2 className="mx-auto size-8 text-ink-3" strokeWidth={1.7} />
                        <p className="mt-2 text-[12px] text-ink-3">aadhaar-{open.id}.jpg</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t border-line px-3.5 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-2">
                        <MapPin className="size-3.5" strokeWidth={2.1} />
                        Address shows {open.district}
                      </span>
                      <button type="button" className="text-[12px] font-semibold text-brand">
                        View full
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2.5 rounded-lg border border-line px-3.5 py-3">
                    <FileX2 className="mt-0.5 size-4 shrink-0 text-critical" strokeWidth={2.1} />
                    <p className="text-[12.5px] leading-relaxed text-ink-2">
                      Not uploaded yet. Send a WhatsApp reminder before deciding.
                    </p>
                  </div>
                )}
              </section>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 text-[13px] font-medium text-ink-2 hover:bg-muted"
              >
                <Phone className="size-4" strokeWidth={2.1} />
                Send WhatsApp message
              </button>
            </div>

            {open.status === 'pending' && (
              <footer className="flex gap-2.5 border-t border-line p-4">
                <button
                  type="button"
                  onClick={() => decide(open.id, 'rejected')}
                  className="flex-1 rounded-lg border border-line px-3 py-2.5 text-[13.5px] font-semibold text-critical hover:bg-critical-soft"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => decide(open.id, 'approved')}
                  disabled={open.aadhaar !== 'uploaded'}
                  className="flex-1 rounded-lg bg-brand px-3 py-2.5 text-[13.5px] font-semibold text-brand-ink hover:bg-brand-hover disabled:opacity-40"
                >
                  Approve seat
                </button>
              </footer>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
