import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, CheckCheck, MessageSquare, Phone, Repeat, Search, Send,
} from 'lucide-react'
import { money, students, supportQueue } from '../../data/admin'
import { batchById, courseById, recipeById } from '../../data/catalog'
import { Avatar } from '../../components/ui'
import { FilterChip, Panel, Pill, Table, Td, Toolbar } from '../../components/admin/ui'

/* ---------------------------------------------------------------- students --- */

export function Students() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter((s) => {
      if (filter === 'repeaters' && !s.repeater) return false
      if (filter === 'offline' && !s.offline) return false
      if (filter === 'leads' && s.status !== 'lead') return false
      if (!q) return true
      return [s.name, s.phone, s.district, s.id].join(' ').toLowerCase().includes(q)
    })
  }, [query, filter])

  return (
    <div className="space-y-4">
      <Toolbar>
        <label className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3">
          <Search className="size-4 text-ink-3" strokeWidth={2.1} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, phone or district"
            className="w-56 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
          />
        </label>
        {[
          ['all', 'All'],
          ['offline', 'Attended batch'],
          ['repeaters', 'Repeaters'],
          ['leads', 'Leads only'],
        ].map(([id, label]) => (
          <FilterChip key={id} active={filter === id} onClick={() => setFilter(id)}>
            {label}
          </FilterChip>
        ))}
      </Toolbar>

      <Panel title="Students" caption={`${list.length} of ${students.length}`} bodyClass="">
        <Table
          head={[
            { label: 'Student' },
            { label: 'District' },
            { label: 'Courses', align: 'right' },
            { label: 'Batch' },
            { label: 'Spend', align: 'right' },
            { label: 'Status' },
          ]}
        >
          {list.map((s) => (
            <tr key={s.id} className="hover:bg-muted">
              <Td>
                <Link to={`/admin/web/students/${s.id}`} className="flex items-center gap-2.5">
                  <Avatar name={s.name} size="sm" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-medium">{s.name}</span>
                      {s.repeater && (
                        <span className="inline-flex items-center gap-1 rounded bg-info-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-info">
                          <Repeat className="size-3" strokeWidth={2.4} />
                          repeater
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-ink-3 tnum">{s.phone}</span>
                  </span>
                </Link>
              </Td>
              <Td className="text-ink-2">
                {s.district}
                <span className="ml-1.5 text-[11.5px] text-ink-3 tnum">{s.distanceKm} km</span>
              </Td>
              <Td align="right" className="tnum">
                {s.courses.length + s.recipes.length}
              </Td>
              <Td className="text-ink-2">{s.offline ? batchById(s.offline)?.code ?? s.offline : '—'}</Td>
              <Td align="right" className="font-semibold tnum">
                {money(s.spend)}
              </Td>
              <Td>
                <Pill status={s.status} />
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

/* ---------------------------------------------------------- student detail --- */

export function StudentDetail() {
  const { id } = useParams()
  const s = students.find((x) => x.id === id)

  if (!s) {
    return (
      <Panel title="Not found">
        <p className="text-[13px] text-ink-2">
          No student with that id.{' '}
          <Link to="/admin/web/students" className="font-semibold text-brand">
            Back to list
          </Link>
        </p>
      </Panel>
    )
  }

  return (
    <div className="space-y-4">
      <Link
        to="/admin/web/students"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={2.2} />
        All students
      </Link>

      <Panel>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={s.name} size="xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{s.name}</h2>
              <Pill status={s.status} />
              {s.repeater && <Pill status="approved">repeater</Pill>}
            </div>
            <p className="mt-1 text-[13px] text-ink-2 tnum">
              {s.id} · {s.phone} · {s.district} ({s.distanceKm} km) · joined {s.joined}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[13px] font-medium text-ink-2 hover:bg-muted"
          >
            <Phone className="size-4" strokeWidth={2.1} />
            WhatsApp
          </button>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Lifetime spend', money(s.spend)],
            ['Online courses', s.courses.length],
            ['Recipes', s.recipes.length],
            ['Residential', s.offline ? batchById(s.offline)?.code ?? s.offline : 'Not yet'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line px-3.5 py-3">
              <dt className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{k}</dt>
              <dd className="mt-1 text-[16px] font-semibold text-ink tnum">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Purchases" bodyClass="">
          <ul className="divide-y divide-line">
            {[
              ...s.courses.map((c) => ({ kind: 'Course', item: courseById(c) })),
              ...s.recipes.map((r) => ({ kind: 'Recipe', item: recipeById(r) })),
            ].map(({ kind, item }) =>
              item ? (
                <li key={kind + item.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-ink">{item.native}</span>
                    <span className="block text-[11.5px] text-ink-3">{kind}</span>
                  </span>
                  <span className="text-[13px] font-semibold text-ink tnum">{money(item.price)}</span>
                </li>
              ) : null,
            )}
            {s.courses.length + s.recipes.length === 0 && (
              <li className="px-4 py-8 text-center text-[13px] text-ink-3">No purchases yet.</li>
            )}
          </ul>
        </Panel>

        <Panel title="Everything that happened" caption="Onboarding, purchases and conversations" bodyClass="">
          <ol className="divide-y divide-line">
            {s.timeline.map((e) => (
              <li key={e.at + e.what} className="flex gap-3 px-4 py-3">
                <span className="w-20 shrink-0 text-[11.5px] text-ink-3 tnum">{e.at}</span>
                <span className="text-[13px] leading-relaxed text-ink-2">{e.what}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- support --- */

export function Support() {
  const [active, setActive] = useState(supportQueue[0])
  const [draft, setDraft] = useState('')

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Panel title="Conversations" caption={`${supportQueue.filter((s) => s.unread).length} unread`} bodyClass="">
        <ul className="divide-y divide-line">
          {supportQueue.map((th) => (
            <li key={th.id}>
              <button
                type="button"
                onClick={() => setActive(th)}
                className={[
                  'flex w-full gap-3 px-4 py-3 text-left transition-colors',
                  active?.id === th.id ? 'bg-brand-soft' : 'hover:bg-muted',
                ].join(' ')}
              >
                <Avatar name={th.student} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span
                      className={[
                        'min-w-0 flex-1 truncate text-[13px]',
                        th.unread ? 'font-bold text-ink' : 'font-medium text-ink-2',
                      ].join(' ')}
                    >
                      {th.student}
                    </span>
                    {th.unread && <span className="size-2 shrink-0 rounded-full bg-brand" />}
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] font-medium text-ink">
                    {th.subject}
                  </span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-ink-3">{th.last}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      {active && (
        <Panel
          title={active.subject}
          caption={`${active.student} · ${active.id}`}
          bodyClass=""
          action={
            <Link
              to={`/admin/web/students/${active.studentId}`}
              className="shrink-0 text-[12.5px] font-semibold text-brand"
            >
              Open profile
            </Link>
          }
        >
          <div className="space-y-3 p-4">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink">
                <p className="mb-1 text-[11px] font-semibold text-ink-3">{active.student}</p>
                {active.last}
              </div>
            </div>
          </div>

          <div className="border-t border-line p-3">
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a reply…"
                className="min-h-[52px] flex-1 resize-none rounded-lg border border-line bg-canvas px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-brand"
              />
              <button
                type="button"
                onClick={() => setDraft('')}
                disabled={!draft.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-brand-ink disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="size-[18px]" strokeWidth={2.1} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Check the flame in the last 10 minutes', 'Share a photo of the batch', 'Call me at 6 PM'].map(
                (q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setDraft(q)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] text-ink-2 hover:bg-muted"
                  >
                    <MessageSquare className="size-3" strokeWidth={2.2} />
                    {q}
                  </button>
                ),
              )}
            </div>
          </div>
        </Panel>
      )}
    </div>
  )
}
