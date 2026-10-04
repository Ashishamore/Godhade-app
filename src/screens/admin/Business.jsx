import { useState } from 'react'
import { Download, GripVertical, ImagePlus, Info, Plus, Send, Trash2 } from 'lucide-react'
import { money, payments, waTemplates } from '../../data/admin'
import { adSlides, OFFLINE_FEE, socialLinks } from '../../data/catalog'
import { LANGUAGES } from '../../i18n'
import { FilterChip, Panel, Pill, Table, Td, Toolbar } from '../../components/admin/ui'

/* ---------------------------------------------------------------- payments --- */

export function Payments() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? payments : payments.filter((p) => p.status === filter)
  const captured = payments.filter((p) => p.status === 'captured')
  const total = captured.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Captured', money(total), `${captured.length} payments`],
          ['Failed', String(payments.filter((p) => p.status === 'failed').length), 'needs follow-up'],
          ['Average order', money(Math.round(total / captured.length)), 'across all products'],
        ].map(([label, value, caption]) => (
          <div key={label} className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[12px] text-ink-3">{label}</p>
            <p className="mt-1.5 text-[21px] font-semibold tracking-[-0.02em] text-ink tnum">{value}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-3">{caption}</p>
          </div>
        ))}
      </div>

      <Toolbar>
        {['all', 'captured', 'failed'].map((f) => (
          <FilterChip key={f} active={filter === f} onClick={() => setFilter(f)}>
            <span className="capitalize">{f}</span>
          </FilterChip>
        ))}
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] font-medium text-ink-2 hover:bg-muted"
        >
          <Download className="size-4" strokeWidth={2.1} />
          Export CSV
        </button>
      </Toolbar>

      <Panel title="Razorpay transactions" caption="Settlement and refunds are handled in Razorpay" bodyClass="">
        <Table
          head={[
            { label: 'Payment id' },
            { label: 'Student' },
            { label: 'Item' },
            { label: 'Method' },
            { label: 'Date' },
            { label: 'Amount', align: 'right' },
            { label: 'Status' },
          ]}
        >
          {list.map((p) => (
            <tr key={p.id} className="hover:bg-muted">
              <Td className="font-mono text-[12px] text-ink-2">{p.id}</Td>
              <Td className="font-medium">{p.student}</Td>
              <Td className="text-ink-2">{p.item}</Td>
              <Td className="text-ink-2">{p.method}</Td>
              <Td className="text-ink-2 tnum">{p.at}</Td>
              <Td align="right" className="font-semibold tnum">
                {money(p.amount)}
              </Td>
              <Td>
                <Pill status={p.status} />
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

/* --------------------------------------------------------------- marketing --- */

export function Marketing() {
  const [templates, setTemplates] = useState(waTemplates)

  const toggle = (id) =>
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)))

  return (
    <div className="space-y-4">
      {/* -------------------------------------------------- home slider --- */}
      <Panel
        title="Home screen slider"
        caption="Shown at the top of the student app"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[12.5px] font-semibold text-brand-ink hover:bg-brand-hover"
          >
            <ImagePlus className="size-4" strokeWidth={2.3} />
            Add slide
          </button>
        }
        bodyClass="p-4 space-y-2.5"
      >
        {adSlides.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-lg border border-line p-2.5">
            <GripVertical className="size-4 shrink-0 cursor-grab text-ink-3" strokeWidth={2} />
            <span className="h-11 w-20 shrink-0 rounded-md" style={{ background: s.tint }} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-ink">{s.title.en}</span>
              <span className="block truncate text-[11.5px] text-ink-3">{s.body.en}</span>
            </span>
            <span className="hidden shrink-0 rounded-md bg-muted px-2 py-1 text-[11px] text-ink-2 sm:block">
              {s.cta}
            </span>
            <button
              type="button"
              aria-label="Remove"
              className="grid size-7 shrink-0 place-items-center rounded-md border border-line text-ink-2 hover:bg-critical-soft hover:text-critical"
            >
              <Trash2 className="size-3.5" strokeWidth={2.1} />
            </button>
          </div>
        ))}
        <p className="pt-1 text-[11.5px] leading-relaxed text-ink-3">
          Slides accept an uploaded banner image in production. Flat colour blocks stand in here so
          the prototype has nothing to load.
        </p>
      </Panel>

      {/* ---------------------------------------------- whatsapp templates --- */}
      <Panel
        title="WhatsApp templates"
        caption="Sent automatically on the event, or manually from a student profile"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-semibold text-ink-2 hover:bg-muted"
          >
            <Plus className="size-4" strokeWidth={2.3} />
            New template
          </button>
        }
        bodyClass=""
      >
        <Table
          head={[
            { label: 'Event' },
            { label: 'Message' },
            { label: 'Sent', align: 'right' },
            { label: 'Active', align: 'right' },
          ]}
        >
          {templates.map((t) => (
            <tr key={t.id} className="hover:bg-muted">
              <Td className="font-medium">{t.event.en}</Td>
              <Td className="max-w-[360px] text-ink-2">
                <span className="line-clamp-2">{t.body}</span>
              </Td>
              <Td align="right" className="tnum">
                {t.sent}
              </Td>
              <Td align="right">
                <button
                  type="button"
                  role="switch"
                  aria-checked={t.active}
                  onClick={() => toggle(t.id)}
                  className={[
                    'inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors',
                    t.active ? 'bg-brand' : 'bg-line-strong',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'size-4 rounded-full bg-white transition-transform',
                      t.active ? 'translate-x-4' : 'translate-x-0',
                    ].join(' ')}
                  />
                </button>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>

      <Panel title="Broadcast" caption="Target a group and send one of the templates above">
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[200px] flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Audience
            </span>
            <select className="mt-1 w-full rounded-lg border border-line bg-canvas px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brand">
              <option>Completed 2+ courses (38)</option>
              <option>Bought a course, never applied (211)</option>
              <option>Applied but advance not paid (9)</option>
              <option>Attended a batch (147)</option>
            </select>
          </label>
          <label className="min-w-[200px] flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Template
            </span>
            <select className="mt-1 w-full rounded-lg border border-line bg-canvas px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brand">
              {templates.map((t) => (
                <option key={t.id}>{t.event.en}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-semibold text-brand-ink hover:bg-brand-hover"
          >
            <Send className="size-4" strokeWidth={2.2} />
            Send
          </button>
        </div>
      </Panel>
    </div>
  )
}

/* ---------------------------------------------------------------- settings --- */

export function Settings() {
  const [fee, setFee] = useState(OFFLINE_FEE)
  const [radius, setRadius] = useState(60)

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Pricing" caption="Applies to new purchases only">
        <div className="space-y-3">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Residential batch fee
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[13px] text-ink-3">₹</span>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value) || 0)}
                className="w-40 rounded-lg border border-line bg-canvas px-3 py-2 text-[14px] text-ink outline-none tnum focus:border-brand"
              />
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-3">
              Shown in the app and in the upsell video card after two completed courses.
            </p>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Default single-product course price
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[13px] text-ink-3">₹</span>
              <input
                type="number"
                defaultValue={2000}
                className="w-40 rounded-lg border border-line bg-canvas px-3 py-2 text-[14px] text-ink outline-none tnum focus:border-brand"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Written recipe price
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[13px] text-ink-3">₹</span>
              <input
                type="number"
                defaultValue={500}
                className="w-40 rounded-lg border border-line bg-canvas px-3 py-2 text-[14px] text-ink outline-none tnum focus:border-brand"
              />
            </div>
          </label>
        </div>
      </Panel>

      <Panel title="Admission rules" caption="Used to flag applications automatically">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
            Minimum distance from Murgud
          </span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value) || 0)}
              className="w-28 rounded-lg border border-line bg-canvas px-3 py-2 text-[14px] text-ink outline-none tnum focus:border-brand"
            />
            <span className="text-[13px] text-ink-3">km</span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">
            Applicants nearer than this are flagged red in Applications. You still decide — nothing
            is auto-rejected.
          </p>
        </label>

        <label className="mt-4 flex items-center gap-3 rounded-lg border border-line px-3.5 py-3">
          <input type="checkbox" defaultChecked className="size-4 accent-[var(--c-brand)]" />
          <span className="text-[13px] text-ink-2">Require Aadhaar before a seat can be approved</span>
        </label>

        <label className="mt-2.5 flex items-center gap-3 rounded-lg border border-line px-3.5 py-3">
          <input type="checkbox" defaultChecked className="size-4 accent-[var(--c-brand)]" />
          <span className="text-[13px] text-ink-2">Lock video after two screen-capture attempts</span>
        </label>
      </Panel>

      <Panel title="Languages" caption="Available in the student app">
        <ul className="space-y-2">
          {LANGUAGES.map((l) => (
            <li key={l.id} className="flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5">
              <span className="text-[13.5px] text-ink">{l.label}</span>
              <span className="text-[11.5px] text-ink-3">{l.short}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Social links" caption="Quick links shown on the app home and profile">
        <ul className="space-y-2">
          {socialLinks.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2.5">
              <span className="w-20 shrink-0 text-[13px] font-medium text-ink">{s.label}</span>
              <input
                defaultValue={s.handle}
                className="min-w-0 flex-1 rounded-md border border-line bg-canvas px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-brand"
              />
            </li>
          ))}
        </ul>
      </Panel>

      <div className="flex gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-3 lg:col-span-2">
        <Info className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={2.1} />
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          Prototype — settings are not persisted. In production these write to the backend and take
          effect immediately across both apps.
        </p>
      </div>
    </div>
  )
}
