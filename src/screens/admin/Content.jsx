import { useState } from 'react'
import { Eye, EyeOff, Info, Pencil, Plus, Video } from 'lucide-react'
import { batches, courses as seedCourses, dateRange, money, recipes as seedRecipes } from '../../data/catalog'
import { courseSales } from '../../data/admin'
import { ProductIcon } from '../../components/ui'
import { Meter } from '../../components/charts'
import { Panel, Pill, Table, Td, Toolbar } from '../../components/admin/ui'

const salesFor = (id) => courseSales.find((c) => c.id === id)?.value ?? 0

/* ----------------------------------------------------------------- courses --- */

export function Courses() {
  const [rows, setRows] = useState(
    seedCourses.map((c) => ({ ...c, status: c.published ? 'published' : 'draft' })),
  )

  const toggle = (id) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === 'published' ? 'hidden' : 'published' }
          : r,
      ),
    )

  const setPrice = (id, price) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, price: Number(price) || 0 } : r)))

  return (
    <div className="space-y-4">
      <Toolbar>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-[13px] font-semibold text-brand-ink hover:bg-brand-hover"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          New course
        </button>
      </Toolbar>

      <div className="flex gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-3">
        <Info className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={2.1} />
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          A published course can be hidden but never deleted — purchases and invoices stay attached
          to it. Hiding removes it from the app while keeping access for students who already paid.
        </p>
      </div>

      <Panel title="Product courses" caption={`${rows.length} total`} bodyClass="">
        <Table
          head={[
            { label: 'Course' },
            { label: 'Price', align: 'right' },
            { label: 'Lessons', align: 'right' },
            { label: 'Sold', align: 'right' },
            { label: 'Status' },
            { label: '', align: 'right' },
          ]}
        >
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-muted">
              <Td>
                <span className="flex items-center gap-3">
                  <ProductIcon name={c.icon} tint={c.tint} size="sm" />
                  <span className="min-w-0">
                    <span className="block font-medium">{c.native}</span>
                    <span className="block text-[11.5px] text-ink-3">{c.name.en}</span>
                  </span>
                </span>
              </Td>
              <Td align="right">
                <span className="inline-flex items-center gap-1">
                  <span className="text-ink-3">₹</span>
                  <input
                    type="number"
                    value={c.price}
                    onChange={(e) => setPrice(c.id, e.target.value)}
                    className="w-20 rounded-md border border-line bg-canvas px-2 py-1 text-right text-[13px] text-ink outline-none tnum focus:border-brand"
                  />
                </span>
              </Td>
              <Td align="right">
                <span className="inline-flex items-center gap-1.5 text-ink-2 tnum">
                  <Video className="size-3.5" strokeWidth={2.1} />
                  {c.lessons.length}
                </span>
              </Td>
              <Td align="right" className="font-semibold tnum">
                {salesFor(c.id)}
              </Td>
              <Td>
                <Pill status={c.status} />
              </Td>
              <Td align="right">
                <span className="inline-flex gap-1.5">
                  <button
                    type="button"
                    aria-label="Edit"
                    className="grid size-7 place-items-center rounded-md border border-line text-ink-2 hover:bg-muted"
                  >
                    <Pencil className="size-3.5" strokeWidth={2.1} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(c.id)}
                    aria-label={c.status === 'published' ? 'Hide' : 'Publish'}
                    disabled={c.status === 'draft'}
                    className="grid size-7 place-items-center rounded-md border border-line text-ink-2 hover:bg-muted disabled:opacity-40"
                  >
                    {c.status === 'published' ? (
                      <EyeOff className="size-3.5" strokeWidth={2.1} />
                    ) : (
                      <Eye className="size-3.5" strokeWidth={2.1} />
                    )}
                  </button>
                </span>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

/* ----------------------------------------------------------------- recipes --- */

export function Recipes() {
  return (
    <div className="space-y-4">
      <Toolbar>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-[13px] font-semibold text-brand-ink hover:bg-brand-hover"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          New recipe
        </button>
      </Toolbar>

      <Panel title="Written recipes" caption={`${seedRecipes.length} published · ${money(500)} each`} bodyClass="">
        <Table
          head={[
            { label: 'Recipe' },
            { label: 'Pages', align: 'right' },
            { label: 'Price', align: 'right' },
            { label: 'Status' },
            { label: '', align: 'right' },
          ]}
        >
          {seedRecipes.map((r) => (
            <tr key={r.id} className="hover:bg-muted">
              <Td>
                <span className="flex items-center gap-3">
                  <ProductIcon name={r.icon} tint={r.tint} size="sm" />
                  <span className="min-w-0">
                    <span className="block font-medium">{r.native}</span>
                    <span className="block text-[11.5px] text-ink-3">{r.title.en}</span>
                  </span>
                </span>
              </Td>
              <Td align="right" className="tnum">
                {r.pages}
              </Td>
              <Td align="right" className="font-semibold tnum">
                {money(r.price)}
              </Td>
              <Td>
                <Pill status="published" />
              </Td>
              <Td align="right">
                <button
                  type="button"
                  aria-label="Edit"
                  className="grid size-7 place-items-center rounded-md border border-line text-ink-2 hover:bg-muted"
                >
                  <Pencil className="size-3.5" strokeWidth={2.1} />
                </button>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>

      <div className="flex gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-3">
        <Info className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={2.1} />
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          Paneer sold 42 courses this month but has no written recipe published — the recipe is the
          cheapest upsell you can offer those students.
        </p>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- batches --- */

export function Batches() {
  return (
    <div className="space-y-4">
      <Toolbar>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-[13px] font-semibold text-brand-ink hover:bg-brand-hover"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          New batch
        </button>
      </Toolbar>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {batches.map((b) => (
          <Panel key={b.id} title={b.code} caption={dateRange(b.start, b.end)} action={<Pill status={b.status} />}>
            <dl className="space-y-2.5">
              <div className="flex items-baseline justify-between">
                <dt className="text-[12.5px] text-ink-3">Venue</dt>
                <dd className="text-[13px] font-medium text-ink">{b.venue.en}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-[12.5px] text-ink-3">Fee per seat</dt>
                <dd className="text-[13px] font-semibold text-ink tnum">{money(b.fee)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-[12.5px] text-ink-3">Expected revenue</dt>
                <dd className="text-[13px] font-semibold text-ink tnum">{money(b.filled * b.fee)}</dd>
              </div>
            </dl>

            <div className="mt-3.5">
              <div className="flex items-baseline justify-between text-[12px] text-ink-3 tnum">
                <span>
                  {b.filled}/{b.seats} seats
                </span>
                <span>{Math.round((b.filled / b.seats) * 100)}%</span>
              </div>
              <Meter value={b.filled} max={b.seats} className="mt-1.5" />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
