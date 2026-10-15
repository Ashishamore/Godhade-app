import { useRef, useState } from 'react'
import { Link, useParams } from '../../components/appRouter'
import {
  AlertCircle, CalendarDays, CheckCircle2, ChevronRight, Clock, FileCheck2, FileUp,
  IndianRupee, MapPin, ShieldCheck, Upload, Users,
} from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import { batchById, dateRange, formatDate, money, offlineIncludes } from '../../data/catalog'
import { Badge, Button, Card, EmptyState, Sheet } from '../../components/ui'
import { Meter } from '../../components/charts'

const ADVANCE = 5000

/* ------------------------------------------------------------ apply flow --- */

function ApplyFlow({ batch, onClose }) {
  const { t, pick } = useI18n()
  const student = useStudent()
  const fileRef = useRef(null)
  const [step, setStep] = useState(1)
  const [doc, setDoc] = useState(null)
  const [consent, setConsent] = useState(false)
  const [sent, setSent] = useState(false)

  const canNext = step === 1 || (step === 2 && doc) || (step === 3 && consent)

  const submit = () => {
    student.setApplication({
      batchId: batch.id,
      status: 'pending',
      appliedAt: new Date().toISOString().slice(0, 10),
      document: doc,
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="animate-pop grid size-14 place-items-center rounded-full bg-positive-soft text-positive">
          <CheckCircle2 className="size-7" strokeWidth={2.2} />
        </span>
        <p className="mt-4 text-[15.5px] font-semibold text-ink">{t('batch.submitted')}</p>
        <p className="mt-1.5 max-w-[20rem] text-[13px] leading-relaxed text-ink-2">
          {t('batch.submittedBody')}
        </p>
      </div>
    )
  }

  return (
    <div className="py-1">
      {/* step rail */}
      <ol className="mb-5 flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <li key={s} className="flex flex-1 items-center gap-1.5">
            <span
              className={[
                'grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold tnum',
                s < step
                  ? 'bg-brand text-brand-ink'
                  : s === step
                    ? 'bg-brand-soft text-brand ring-1 ring-brand'
                    : 'bg-muted text-ink-3',
              ].join(' ')}
            >
              {s < step ? <CheckCircle2 className="size-3.5" strokeWidth={2.6} /> : s}
            </span>
            {s < 3 && (
              <span className={['h-px flex-1', s < step ? 'bg-brand' : 'bg-line'].join(' ')} />
            )}
          </li>
        ))}
      </ol>

      {/* ------------------------------------------------- step 1: details --- */}
      {step === 1 && (
        <div className="space-y-3">
          <h3 className="text-[14.5px] font-semibold text-ink">{t('batch.personal')}</h3>
          {[
            [pick({ en: 'Full name', hi: 'पूरा नाम', mr: 'पूर्ण नाव' }), student.profile.name],
            [pick({ en: 'Mobile', hi: 'मोबाइल', mr: 'मोबाइल' }), student.profile.phone],
            [pick({ en: 'District', hi: 'ज़िला', mr: 'जिल्हा' }), student.profile.district],
            [pick({ en: 'State', hi: 'राज्य', mr: 'राज्य' }), student.profile.state],
          ].map(([label, value]) => (
            <label key={label} className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                {label}
              </span>
              <input
                defaultValue={value}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none focus:border-brand"
              />
            </label>
          ))}
        </div>
      )}

      {/* ------------------------------------------------ step 2: aadhaar --- */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="text-[14.5px] font-semibold text-ink">{t('batch.document')}</h3>
          <p className="text-[12.5px] leading-relaxed text-ink-2">{t('batch.documentBody')}</p>

          <input
            ref={fileRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) setDoc({ name: f.name, size: Math.round(f.size / 1024) })
            }}
          />

          {doc ? (
            <div className="flex items-center gap-3 rounded-lg border border-brand/30 bg-brand-soft px-3.5 py-3">
              <FileCheck2 className="size-5 shrink-0 text-brand" strokeWidth={2} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">{doc.name}</span>
                <span className="block text-[11.5px] text-ink-3 tnum">
                  {doc.size} KB · {t('batch.uploaded')}
                </span>
              </span>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="shrink-0 text-[12.5px] font-semibold text-brand"
              >
                {t('batch.replace')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-line-strong px-4 py-7 transition-colors active:bg-muted"
            >
              <FileUp className="size-6 text-ink-3" strokeWidth={1.8} />
              <span className="text-[13.5px] font-medium text-ink">{t('batch.upload')}</span>
              <span className="text-[11.5px] text-ink-3">JPG, PNG {pick({ en: 'or', hi: 'या', mr: 'किंवा' })} PDF</span>
            </button>
          )}

          <div className="flex gap-2.5 rounded-lg border border-line px-3.5 py-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.1} />
            <p className="text-[11.5px] leading-relaxed text-ink-2">
              {pick({
                en: 'Your document is visible only to the admission team and is never shown to other students.',
                hi: 'आपका दस्तावेज़ केवल प्रवेश टीम को दिखता है, अन्य विद्यार्थियों को कभी नहीं।',
                mr: 'तुमचे कागदपत्र फक्त प्रवेश टीमला दिसते, इतर विद्यार्थ्यांना कधीही नाही.',
              })}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------- step 3: consent --- */}
      {step === 3 && (
        <div className="space-y-3">
          <h3 className="text-[14.5px] font-semibold text-ink">{t('batch.review')}</h3>

          <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line">
            {[
              [pick({ en: 'Batch', hi: 'बैच', mr: 'बॅच' }), batch.code],
              [pick({ en: 'Dates', hi: 'तारीख़', mr: 'तारखा' }), dateRange(batch.start, batch.end)],
              [pick({ en: 'Name', hi: 'नाम', mr: 'नाव' }), student.profile.name],
              [pick({ en: 'District', hi: 'ज़िला', mr: 'जिल्हा' }), student.profile.district],
              [t('batch.document'), doc?.name ?? '—'],
              [pick({ en: 'Fee', hi: 'फ़ीस', mr: 'फी' }), money(batch.fee)],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 px-3.5 py-2.5">
                <dt className="text-[12.5px] text-ink-3">{k}</dt>
                <dd className="truncate text-[13.5px] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <label className="flex cursor-pointer gap-3 rounded-lg border border-line px-3.5 py-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[var(--c-brand)]"
            />
            <span className="text-[12.5px] leading-relaxed text-ink-2">{t('batch.consentText')}</span>
          </label>
        </div>
      )}

      <div className="mt-5 flex gap-2.5">
        {step > 1 && (
          <Button variant="secondary" block onClick={() => setStep((s) => s - 1)}>
            {t('common.back')}
          </Button>
        )}
        <Button
          block
          disabled={!canNext}
          onClick={() => (step === 3 ? submit() : setStep((s) => s + 1))}
        >
          {step === 3 ? t('batch.submit') : t('common.next')}
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- the screen --- */

export default function Batch() {
  const { id } = useParams()
  const { t, pick } = useI18n()
  const student = useStudent()
  const [applying, setApplying] = useState(false)

  const batch = batchById(id)
  if (!batch) {
    return (
      <EmptyState
        title={t('courses.noResults')}
        body={t('courses.noResultsBody')}
        action={
          <Button as={Link} to="/courses?tab=batch" size="sm">
            {t('courses.offline')}
          </Button>
        }
      />
    )
  }

  const app = student.application?.batchId === batch.id ? student.application : null
  const setStatus = (status) => student.setApplication({ ...app, status })

  const STATUS = {
    pending: { tone: 'warning', label: t('batch.statusPending'), icon: Clock },
    approved: { tone: 'brand', label: t('batch.statusApproved'), icon: CheckCircle2 },
    confirmed: { tone: 'positive', label: t('batch.statusConfirmed'), icon: CheckCircle2 },
  }

  return (
    <>
      <ScreenHeader back title={batch.code} subtitle={t('home.offlineTitle')} />

      <Screen className="space-y-6">
        {/* ------------------------------------------------ status banner --- */}
        {app && (
          <Card className="overflow-hidden">
            <div
              className={[
                'flex items-center gap-2.5 px-4 py-3',
                app.status === 'confirmed' ? 'bg-positive-soft' : app.status === 'approved' ? 'bg-brand-soft' : 'bg-warning-soft',
              ].join(' ')}
            >
              {(() => {
                const Icon = STATUS[app.status].icon
                return (
                  <Icon
                    className={[
                      'size-5 shrink-0',
                      app.status === 'confirmed' ? 'text-positive' : app.status === 'approved' ? 'text-brand' : 'text-warning',
                    ].join(' ')}
                    strokeWidth={2.1}
                  />
                )
              })()}
              <p
                className={[
                  'text-[14px] font-semibold',
                  app.status === 'confirmed' ? 'text-positive' : app.status === 'approved' ? 'text-brand' : 'text-warning',
                ].join(' ')}
              >
                {STATUS[app.status].label}
              </p>
            </div>

            <div className="p-4">
              <p className="text-[12.5px] leading-relaxed text-ink-2">
                {app.status === 'pending' && t('batch.submittedBody')}
                {app.status === 'approved' &&
                  pick({
                    en: `Your seat is approved. Pay ${money(ADVANCE)} advance to confirm it.`,
                    hi: `आपकी सीट मंज़ूर है। पक्का करने के लिए ${money(ADVANCE)} एडवांस भरें।`,
                    mr: `तुमची जागा मंजूर आहे. निश्चित करण्यासाठी ${money(ADVANCE)} अ‍ॅडव्हान्स भरा.`,
                  })}
                {app.status === 'confirmed' &&
                  pick({
                    en: `Reporting at ${pick(batch.venue)} on ${formatDate(batch.start, { weekday: 'long' })}, 9 AM. Balance payable at the unit.`,
                    hi: `${formatDate(batch.start, { weekday: 'long' })} सुबह 9 बजे ${pick(batch.venue)} पहुँचें। शेष राशि यूनिट पर।`,
                    mr: `${formatDate(batch.start, { weekday: 'long' })} सकाळी ९ वाजता ${pick(batch.venue)} येथे या. उर्वरित रक्कम युनिटवर.`,
                  })}
              </p>

              {app.status === 'approved' && (
                <Button block className="mt-3.5" onClick={() => setStatus('confirmed')}>
                  <IndianRupee className="size-4" strokeWidth={2.3} />
                  {t('batch.payAdvance')} {money(ADVANCE)}
                </Button>
              )}

              {/* Prototype control so the whole admission journey can be walked
                  through without the admin panel being wired to this state. */}
              {app.status === 'pending' && (
                <button
                  type="button"
                  onClick={() => setStatus('approved')}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong px-3 py-2 text-[12px] font-medium text-ink-3 transition-colors active:bg-muted"
                >
                  <AlertCircle className="size-3.5" strokeWidth={2.1} />
                  {pick({
                    en: 'Demo: simulate admin approval',
                    hi: 'डेमो: एडमिन मंज़ूरी दिखाएँ',
                    mr: 'डेमो: अ‍ॅडमिन मंजुरी दाखवा',
                  })}
                </button>
              )}
            </div>
          </Card>
        )}

        {/* ---------------------------------------------------- the batch --- */}
        <Card className="p-4">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <CalendarDays className="size-3.5" strokeWidth={2.2} />
                {pick({ en: 'Dates', hi: 'तारीख़', mr: 'तारखा' })}
              </dt>
              <dd className="mt-1 text-[14px] font-semibold text-ink tnum">
                {dateRange(batch.start, batch.end)}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <MapPin className="size-3.5" strokeWidth={2.2} />
                {pick({ en: 'Venue', hi: 'स्थान', mr: 'ठिकाण' })}
              </dt>
              <dd className="mt-1 text-[14px] font-semibold text-ink">{pick(batch.venue)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <IndianRupee className="size-3.5" strokeWidth={2.2} />
                {pick({ en: 'Fee', hi: 'फ़ीस', mr: 'फी' })}
              </dt>
              <dd className="mt-1 text-[14px] font-semibold text-ink tnum">{money(batch.fee)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <Users className="size-3.5" strokeWidth={2.2} />
                {pick({ en: 'Seats', hi: 'सीटें', mr: 'जागा' })}
              </dt>
              <dd className="mt-1 text-[14px] font-semibold text-ink tnum">
                {batch.seats - batch.filled} / {batch.seats}
              </dd>
            </div>
          </dl>

          <Meter value={batch.filled} max={batch.seats} className="mt-4" />
        </Card>

        {/* ----------------------------------------------------- includes --- */}
        <section>
          <SectionTitle title={t('batch.includes')} />
          <ul className="space-y-2">
            {pick(offlineIncludes).map((item) => (
              <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------- how it works --- */}
        <section>
          <SectionTitle
            title={pick({ en: 'How admission works', hi: 'प्रवेश कैसे होता है', mr: 'प्रवेश कसा होतो' })}
          />
          <ol className="space-y-2.5">
            {pick({
              en: [
                'Fill your details and upload your Aadhaar',
                'Our team verifies your district and approves the seat',
                'Pay the advance to confirm',
                'Balance is paid at the unit on day one',
              ],
              hi: [
                'जानकारी भरें और आधार अपलोड करें',
                'टीम ज़िला जाँचकर सीट मंज़ूर करती है',
                'पक्का करने के लिए एडवांस भरें',
                'शेष राशि पहले दिन यूनिट पर',
              ],
              mr: [
                'माहिती भरा आणि आधार अपलोड करा',
                'टीम जिल्हा तपासून जागा मंजूर करते',
                'निश्चित करण्यासाठी अ‍ॅडव्हान्स भरा',
                'उर्वरित रक्कम पहिल्या दिवशी युनिटवर',
              ],
            }).map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-semibold text-ink-2 tnum">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink-2">{s}</span>
              </li>
            ))}
          </ol>
        </section>
      </Screen>

      {!app && batch.status === 'open' && (
        <div className="sticky bottom-0 z-30 border-t border-line bg-surface px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="text-[17px] font-semibold text-ink tnum">{money(batch.fee)}</p>
              <p className="text-[11px] text-ink-3">
                {money(ADVANCE)} {pick({ en: 'advance', hi: 'एडवांस', mr: 'अ‍ॅडव्हान्स' })}
              </p>
            </div>
            <Button size="lg" className="ml-auto flex-1 @wide:max-w-56" onClick={() => setApplying(true)}>
              {t('batch.apply')}
              <ChevronRight className="size-4" strokeWidth={2.4} />
            </Button>
          </div>
        </div>
      )}

      <Sheet
        open={applying}
        onClose={() => setApplying(false)}
        title={t('batch.applyTitle')}
        description={batch.code + ' · ' + dateRange(batch.start, batch.end)}
      >
        <ApplyFlow batch={batch} onClose={() => setApplying(false)} />
      </Sheet>
    </>
  )
}
