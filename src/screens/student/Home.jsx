import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from '../../components/appRouter'
import {
  ArrowRight, BookOpen, Calculator, ChevronRight, Headphones, MapPin, Play,
  ShieldCheck, Users,
} from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import {
  adSlides, batches, courseById, courses, dateRange, money, recipes, socialLinks,
} from '../../data/catalog'
import { Badge, Button, Card, ProductIcon } from '../../components/ui'
import { Meter } from '../../components/charts'
import Logo from '../../components/Logo'
import LanguagePill from '../../components/LanguagePill'
import SocialRow from '../../components/SocialRow'

/* ---------------------------------------------------------------- slider --- */
/* Advertisement slides — the admin panel swaps these out. */

function AdSlider() {
  const { pick } = useI18n()
  const navigate = useNavigate()
  const rail = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      const el = rail.current
      if (!el) return
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % adSlides.length
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const go = (slide) => {
    if (slide.cta === 'batch') navigate('/batch/' + batches[0].id)
    else if (slide.cta?.startsWith('course:')) navigate('/course/' + slide.cta.split(':')[1])
  }

  return (
    <section aria-label="Announcements">
      <div
        ref={rail}
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {adSlides.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s)}
            className="w-full shrink-0 snap-center px-0.5 text-left"
          >
            <div className="rounded-xl px-4 py-5" style={{ background: s.tint }}>
              <p className="text-[15.5px] font-semibold text-white">{pick(s.title)}</p>
              <p className="mt-1 text-[12.5px] text-white/80">{pick(s.body)}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-white/15 px-2.5 py-1 text-[12px] font-medium text-white">
                {pick({ en: 'View', hi: 'देखें', mr: 'पाहा' })}
                <ArrowRight className="size-3.5" strokeWidth={2.4} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-2.5 flex justify-center gap-1.5">
        {adSlides.map((s, i) => (
          <span
            key={s.id}
            className={[
              'h-1 rounded-full transition-all duration-300',
              i === active ? 'w-5 bg-brand' : 'w-1.5 bg-line-strong',
            ].join(' ')}
          />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ home --- */

export default function Home() {
  const { t, pick } = useI18n()
  const student = useStudent()
  const navigate = useNavigate()

  const inProgress = courses.find(
    (c) => student.ownsCourse(c.id) && !student.isCourseComplete(c.id),
  )
  const progress = inProgress ? student.courseProgress(inProgress.id) : null
  const nextBatch = batches.find((b) => b.status === 'open')
  const popular = courses.filter((c) => c.published).slice(0, 6)

  const quickActions = [
    { to: '/calculator', icon: Calculator, label: t('nav.calculator'), tint: '#c2410c' },
    { to: '/courses?tab=recipes', icon: BookOpen, label: t('home.recipes'), tint: '#8a5a08' },
    { to: '/batch/' + (nextBatch?.id ?? batches[0].id), icon: Users, label: t('courses.offline'), tint: '#1b4f8a' },
    { to: '/support', icon: Headphones, label: t('profile.support'), tint: '#8a3b8a' },
  ]

  return (
    <>
      <ScreenHeader actions={<LanguagePill />}>
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <Logo className="size-9 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
              {t('brand.name')}
            </p>
            <p className="truncate text-[11.5px] text-ink-3">
              {t('home.greeting')}, {student.profile.name.split(' ')[0]}
            </p>
          </div>
        </div>
      </ScreenHeader>

      <Screen className="space-y-6">
        <AdSlider />

        {/* ------------------------------------------------ welcome video --- */}
        <Card style={{ '--i': 0 }} className="stagger overflow-hidden">
          <button
            type="button"
            onClick={() => navigate('/welcome')}
            className="flex w-full items-center gap-3.5 p-3.5 text-left transition-colors active:bg-muted"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand text-brand-ink">
              <Play className="size-6 fill-current" strokeWidth={0} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold leading-snug text-ink">
                {t('home.welcomeTitle')}
              </span>
              <span className="mt-0.5 block text-[12.5px] text-ink-3">{t('home.watch')} · 2:14</span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
          </button>
        </Card>

        {/* ---------------------------------------------- continue course --- */}
        {inProgress && (
          <section style={{ '--i': 1 }} className="stagger">
            <SectionTitle title={t('home.continue')} />
            <Card as={Link} to={'/course/' + inProgress.id} interactive className="block p-3.5">
              <div className="flex items-center gap-3.5">
                <ProductIcon name={inProgress.icon} tint={inProgress.tint} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14.5px] font-semibold text-ink">
                    {pick(inProgress.name)}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-3 tnum">
                    {progress.done}/{progress.total} {t('courses.lessons')} · {progress.pct}%
                  </p>
                </div>
                <Button size="sm" className="shrink-0">
                  {t('home.resume')}
                </Button>
              </div>
              <Meter value={progress.pct} className="mt-3" />
            </Card>
          </section>
        )}

        {/* --------------------------------------------------- quick grid --- */}
        <section style={{ '--i': 2 }} className="stagger">
          <SectionTitle title={t('home.quickActions')} />
          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-surface px-1 py-3 text-center transition-colors active:bg-muted"
              >
                <span
                  className="grid size-10 place-items-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${a.tint} 13%, transparent)`, color: a.tint }}
                >
                  <a.icon className="size-[19px]" strokeWidth={1.9} />
                </span>
                <span className="text-[10.5px] font-medium leading-tight text-ink-2">{a.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------- popular courses --- */}
        <section style={{ '--i': 3 }} className="stagger">
          <SectionTitle
            title={t('home.popular')}
            caption={money(2000) + ' · ' + pick({ en: 'learn one product', hi: 'एक प्रोडक्ट सीखें', mr: 'एक प्रॉडक्ट शिका' })}
            action={
              <Link to="/courses" className="shrink-0 text-[13px] font-semibold text-brand">
                {t('home.viewAll')}
              </Link>
            }
          />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scroll-padding-inline:1rem]">
            {popular.map((c) => (
              <Link
                key={c.id}
                to={'/course/' + c.id}
                className="w-[168px] shrink-0 snap-start rounded-xl border border-line bg-surface p-3 transition-colors active:bg-muted"
              >
                <div className="flex items-start justify-between">
                  <ProductIcon name={c.icon} tint={c.tint} size="md" />
                  {student.ownsCourse(c.id) && <Badge tone="positive">{t('courses.owned')}</Badge>}
                </div>
                <p className="mt-2.5 text-[16px] font-semibold leading-tight text-ink">{c.native}</p>
                <p className="mt-0.5 line-clamp-1 text-[12px] text-ink-3">{pick(c.name)}</p>
                <div className="mt-2.5 flex items-baseline justify-between border-t border-line pt-2">
                  <span className="text-[13.5px] font-semibold text-ink tnum">{money(c.price)}</span>
                  <span className="text-[11.5px] text-ink-3 tnum">
                    {c.lessons.length} {t('courses.lessons')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* -------------------------------------------- residential batch --- */}
        {nextBatch && (
          <section style={{ '--i': 4 }} className="stagger">
            <Card className="overflow-hidden">
              <div className="border-b border-line bg-brand-soft px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[14.5px] font-semibold text-brand">{t('home.offlineTitle')}</p>
                  <Badge tone="brand">{money(nextBatch.fee)}</Badge>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[13px] leading-relaxed text-ink-2">{t('home.offlineBody')}</p>

                <dl className="mt-3.5 grid grid-cols-2 gap-3">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.06em] text-ink-3">
                      {nextBatch.code}
                    </dt>
                    <dd className="mt-0.5 text-[13.5px] font-semibold text-ink tnum">
                      {dateRange(nextBatch.start, nextBatch.end)}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] text-ink-3">
                      <MapPin className="size-3" strokeWidth={2.4} />
                      {pick({ en: 'Venue', hi: 'स्थान', mr: 'ठिकाण' })}
                    </dt>
                    <dd className="mt-0.5 truncate text-[13.5px] font-semibold text-ink">
                      {pick(nextBatch.venue)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-ink-3 tnum">
                      {nextBatch.seats - nextBatch.filled} {t('home.seats')}
                    </span>
                    <span className="text-ink-3 tnum">
                      {nextBatch.filled}/{nextBatch.seats}
                    </span>
                  </div>
                  <Meter value={nextBatch.filled} max={nextBatch.seats} className="mt-1.5" />
                </div>

                <Button as={Link} to={'/batch/' + nextBatch.id} block className="mt-4">
                  {t('batch.apply')}
                </Button>
              </div>
            </Card>
          </section>
        )}

        {/* --------------------------------------------------- written recipes --- */}
        <section style={{ '--i': 5 }} className="stagger">
          <SectionTitle
            title={t('home.recipes')}
            caption={money(500) + ' ' + pick({ en: 'each', hi: 'प्रति', mr: 'प्रत्येकी' })}
            action={
              <Link to="/courses?tab=recipes" className="shrink-0 text-[13px] font-semibold text-brand">
                {t('home.viewAll')}
              </Link>
            }
          />
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {recipes.slice(0, 3).map((r) => (
              <Link
                key={r.id}
                to={'/recipe/' + r.id}
                className="flex items-center gap-3 px-3.5 py-3 transition-colors active:bg-muted"
              >
                <ProductIcon name={r.icon} tint={r.tint} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-ink">{r.native}</span>
                  <span className="block text-[11.5px] text-ink-3 tnum">
                    {r.pages} {pick({ en: 'pages', hi: 'पन्ने', mr: 'पाने' })}
                  </span>
                </span>
                <span className="text-[13px] font-semibold text-ink tnum">{money(r.price)}</span>
                <ChevronRight className="size-4 shrink-0 text-ink-3" strokeWidth={2.2} />
              </Link>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- support --- */}
        <Card as={Link} to="/support" interactive style={{ '--i': 6 }} className="stagger flex items-center gap-3.5 p-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-ink-2">
            <Headphones className="size-5" strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-ink">{t('home.support')}</span>
            <span className="mt-0.5 block text-[12px] text-ink-3">{t('home.supportBody')}</span>
          </span>
          <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
        </Card>

        {/* -------------------------------------------------------- social --- */}
        <section style={{ '--i': 7 }} className="stagger">
          <SectionTitle title={t('home.connect')} />
          <SocialRow links={socialLinks} />
        </section>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11.5px] text-ink-3">
          <ShieldCheck className="size-3.5" strokeWidth={2} />
          {t('brand.tagline')}
        </p>
      </Screen>
    </>
  )
}
