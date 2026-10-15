import { Link } from 'react-router-dom'
import {
  AlertTriangle, ArrowRight, CheckCircle2, Info, Lightbulb, Lock, MapPin,
} from 'lucide-react'
import {
  applications, compactMoney, courseSales, districtSplit, kpis, lockedSessions,
  monthlyRevenue, money, revenueSplit, students, suggestions,
} from '../../data/admin'
import { batches, courseById, dateRange } from '../../data/catalog'
import { Donut, GroupedBars, RankedBars, Meter } from '../../components/charts'
import { Kpi, Panel, Pill, Table, Td } from '../../components/admin/ui'

const TONE_ICON = { warning: AlertTriangle, info: Info, positive: CheckCircle2 }
const TONE_CLASS = {
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  positive: 'bg-positive-soft text-positive',
}

export default function Dashboard() {
  const pending = applications.filter((a) => a.status === 'pending')
  const totalRevenue = revenueSplit.reduce((s, r) => s + r.value, 0)
  const openBatch = batches.find((b) => b.status === 'open')

  return (
    <div className="space-y-5">
      {/* --------------------------------------------------------- KPIs --- */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Kpi
            key={k.id}
            label={k.label.en}
            value={k.money ? compactMoney(k.value) : k.value.toLocaleString('en-IN')}
            delta={k.delta}
            spark={k.spark}
            tone={k.tone}
          />
        ))}
      </div>

      {/* -------------------------------------------------- suggestions --- */}
      <Panel
        title="Needs your attention"
        caption="Generated from this week's activity"
        bodyClass="p-4 grid gap-3 lg:grid-cols-3"
      >
        {suggestions.map((s) => {
          const Icon = TONE_ICON[s.tone]
          return (
            <Link
              key={s.id}
              to={s.to}
              className="group rounded-lg border border-line p-3.5 transition-colors hover:bg-muted"
            >
              <span className={['grid size-8 place-items-center rounded-lg', TONE_CLASS[s.tone]].join(' ')}>
                <Icon className="size-[17px]" strokeWidth={2.1} />
              </span>
              <p className="mt-2.5 text-[13.5px] font-semibold leading-snug text-ink">{s.title.en}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-2">{s.body.en}</p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand">
                {s.action.en}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
              </span>
            </Link>
          )
        })}
      </Panel>

      {/* ------------------------------------------------------- charts --- */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Revenue by month" caption="Residential vs. online" className="lg:col-span-2">
          <GroupedBars
            data={monthlyRevenue}
            format={compactMoney}
            series={[
              { key: 'offline', label: 'Residential batches', tint: 'var(--c-brand)' },
              { key: 'online', label: 'Online courses & recipes', tint: '#1b4f8a' },
            ]}
          />
        </Panel>

        <Panel title="Revenue mix" caption="This month">
          <div className="flex flex-col items-center gap-4">
            <Donut
              data={revenueSplit}
              centerValue={compactMoney(totalRevenue)}
              centerLabel="total"
            />
            <ul className="w-full space-y-2">
              {revenueSplit.map((r) => (
                <li key={r.id} className="flex items-center gap-2.5">
                  <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: r.tint }} />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-2">{r.label.en}</span>
                  <span className="shrink-0 text-[12.5px] font-semibold text-ink tnum">
                    {compactMoney(r.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Best selling courses" caption="Units sold this month">
          <RankedBars data={courseSales} />
        </Panel>

        <Panel title="Where enquiries come from" caption="Average distance from Murgud">
          <ul className="space-y-2.5">
            {districtSplit.map((d) => {
              const tooClose = d.avgKm < 60
              return (
                <li key={d.district} className="flex items-center gap-3">
                  <MapPin
                    className={['size-4 shrink-0', tooClose ? 'text-critical' : 'text-ink-3'].join(' ')}
                    strokeWidth={2.1}
                  />
                  <span className="w-20 shrink-0 truncate text-[13px] text-ink">{d.district}</span>
                  <span className="h-5 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-muted">
                    <span
                      className="block h-full rounded-[3px]"
                      style={{
                        width: `${(d.count / districtSplit[0].count) * 100}%`,
                        background: tooClose ? 'var(--c-critical)' : 'var(--c-brand)',
                      }}
                    />
                  </span>
                  <span className="w-10 shrink-0 text-right text-[12.5px] font-semibold text-ink tnum">
                    {d.count}
                  </span>
                  <span
                    className={[
                      'w-16 shrink-0 text-right text-[11.5px] tnum',
                      tooClose ? 'font-semibold text-critical' : 'text-ink-3',
                    ].join(' ')}
                  >
                    {d.avgKm} km
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-relaxed text-ink-3">
            Red marks districts inside the 60 km radius, where admitting students would build
            competition near the unit.
          </p>
        </Panel>
      </div>

      {/* ------------------------------------------------- action lists --- */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Applications waiting"
          caption={`${pending.length} to review`}
          bodyClass=""
          action={
            <Link to="/admin/web/admissions" className="shrink-0 text-[12.5px] font-semibold text-brand">
              Open
            </Link>
          }
        >
          <Table
            head={[
              { label: 'Applicant' },
              { label: 'District' },
              { label: 'Distance', align: 'right' },
              { label: 'Status', align: 'right' },
            ]}
          >
            {pending.slice(0, 5).map((a) => (
              <tr key={a.id} className="hover:bg-muted">
                <Td>
                  <span className="font-medium">{a.name}</span>
                  {a.repeater && (
                    <span className="ml-2 rounded bg-info-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-info">
                      repeater
                    </span>
                  )}
                </Td>
                <Td className="text-ink-2">{a.district}</Td>
                <Td align="right">
                  <span className={a.distanceKm < 60 ? 'font-semibold text-critical tnum' : 'text-ink-2 tnum'}>
                    {a.distanceKm} km
                  </span>
                </Td>
                <Td align="right">
                  <Pill status={a.aadhaar === 'pending' ? 'rejected' : 'pending'}>
                    {a.aadhaar === 'pending' ? 'no aadhaar' : 'pending'}
                  </Pill>
                </Td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-4">
          {openBatch && (
            <Panel title="Next batch" caption={`${openBatch.code} · ${dateRange(openBatch.start, openBatch.end)}`}>
              <div className="flex items-baseline justify-between text-[12.5px]">
                <span className="text-ink-2 tnum">
                  {openBatch.filled} of {openBatch.seats} seats filled
                </span>
                <span className="font-semibold text-ink tnum">
                  {money(openBatch.filled * openBatch.fee)}
                </span>
              </div>
              <Meter value={openBatch.filled} max={openBatch.seats} className="mt-2" />
              <p className="mt-2.5 text-[11.5px] text-ink-3">
                {openBatch.seats - openBatch.filled} seats left · {money(openBatch.fee)} per seat
              </p>
            </Panel>
          )}

          <Panel
            title="Locked video sessions"
            caption="Students blocked for screen capture"
            bodyClass=""
          >
            <ul className="divide-y divide-line">
              {lockedSessions.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-critical-soft text-critical">
                    <Lock className="size-4" strokeWidth={2.1} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-ink">{l.student}</span>
                    <span className="block truncate text-[11.5px] text-ink-3">
                      {courseById(l.course)?.native} · {l.reason}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-semibold text-ink-2 hover:bg-muted"
                  >
                    Unlock
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-[11.5px] text-ink-3">
        <Lightbulb className="size-3.5" strokeWidth={2} />
        Prototype — all figures are illustrative demo data.
      </p>
    </div>
  )
}
