import { useMemo, useState } from 'react'
import { Link, useSearchParams } from '../../components/appRouter'
import { CheckCircle2, ChevronRight, Clock, Lock, SearchX, Star, Users } from 'lucide-react'
import Screen, { ScreenHeader } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import {
  batches, courses, dateRange, money, offlineIncludes, recipes,
} from '../../data/catalog'
import {
  Badge, Button, Card, EmptyState, ProductIcon, SearchField, Segmented,
} from '../../components/ui'
import { Meter } from '../../components/charts'

function CourseRow({ course, index }) {
  const { t, pick } = useI18n()
  const student = useStudent()
  const owned = student.ownsCourse(course.id)
  const progress = owned ? student.courseProgress(course.id) : null

  return (
    <Card
      as={Link}
      to={'/course/' + course.id}
      interactive
      style={{ '--i': index }}
      className="stagger block p-3.5"
    >
      <div className="flex gap-3.5">
        <ProductIcon name={course.icon} tint={course.tint} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-tight text-ink">{course.native}</p>
              <p className="mt-0.5 truncate text-[12.5px] text-ink-2">{pick(course.name)}</p>
            </div>
            {owned ? (
              <Badge tone="positive">{t('courses.owned')}</Badge>
            ) : (
              <span className="shrink-0 text-[14px] font-semibold text-ink tnum">
                {money(course.price)}
              </span>
            )}
          </div>

          <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink-3">
            {pick(course.tagline)}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-3 tnum">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" strokeWidth={2} />
              {course.durationMin} {t('common.min')}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" strokeWidth={2} />
              {course.learners}
            </span>
            {course.rating > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star className="size-3.5 fill-current text-gold" strokeWidth={0} />
                {course.rating}
              </span>
            )}
            {course.isBase && (
              <Badge tone="brand">
                {pick({ en: 'Base product', hi: 'बेस प्रोडक्ट', mr: 'बेस प्रॉडक्ट' })}
              </Badge>
            )}
          </div>

          {owned && progress.total > 0 && (
            <div className="mt-2.5">
              <Meter value={progress.pct} />
              <p className="mt-1 text-[11px] text-ink-3 tnum">
                {progress.done}/{progress.total} {t('courses.lessons')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function Courses() {
  const { t, pick } = useI18n()
  const student = useStudent()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') ?? 'products'
  const [query, setQuery] = useState('')

  const setTab = (id) => setParams(id === 'products' ? {} : { tab: id }, { replace: true })

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = courses.filter((c) => c.published)
    if (!q) return pool
    return pool.filter((c) =>
      [c.native, c.name.en, c.name.hi, c.name.mr].join(' ').toLowerCase().includes(q),
    )
  }, [query])

  const upcoming = courses.filter((c) => !c.published)

  return (
    <>
      <ScreenHeader
        title={t('courses.title')}
        below={
          <div className="space-y-3">
            <Segmented
              value={tab}
              onChange={setTab}
              options={[
                { id: 'products', label: t('courses.online') },
                { id: 'recipes', label: t('courses.recipes') },
                { id: 'batch', label: t('courses.offline') },
              ]}
            />
            {tab === 'products' && (
              <SearchField value={query} onChange={setQuery} placeholder={t('courses.search')} />
            )}
          </div>
        }
      />

      <Screen>
        {/* ------------------------------------------------ single product --- */}
        {tab === 'products' &&
          (list.length === 0 ? (
            <EmptyState
              icon={<SearchX className="size-6" strokeWidth={1.9} />}
              title={t('courses.noResults')}
              body={t('courses.noResultsBody')}
              action={
                <Button size="sm" variant="secondary" onClick={() => setQuery('')}>
                  {t('common.all')}
                </Button>
              }
            />
          ) : (
            <div className="space-y-3 @wide:grid @wide:grid-cols-2 @wide:gap-3 @wide:space-y-0 @desk:grid-cols-3">
              {list.map((c, i) => (
                <CourseRow key={c.id} course={c} index={i} />
              ))}

              {upcoming.map((c) => (
                <Card key={c.id} className="flex items-center gap-3.5 p-3.5 opacity-70">
                  <ProductIcon name={c.icon} tint={c.tint} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold text-ink">{c.native}</p>
                    <p className="mt-0.5 text-[12px] text-ink-3">{pick(c.tagline)}</p>
                  </div>
                  <Badge tone="neutral">
                    <Lock className="size-3" strokeWidth={2.4} />
                    {pick({ en: 'Soon', hi: 'जल्द', mr: 'लवकरच' })}
                  </Badge>
                </Card>
              ))}
            </div>
          ))}

        {/* ------------------------------------------------------- recipes --- */}
        {tab === 'recipes' && (
          <div className="space-y-3 @wide:grid @wide:grid-cols-2 @wide:gap-3 @wide:space-y-0 @desk:grid-cols-3">
            <p className="text-[12.5px] leading-relaxed text-ink-3 @wide:col-span-2 @desk:col-span-3">
              {pick({
                en: 'Step-by-step written recipes with exact quantities, timings and costing. Buy once, keep forever.',
                hi: 'सटीक मात्रा, समय और लागत के साथ लिखित रेसिपी। एक बार ख़रीदें, हमेशा रखें।',
                mr: 'नेमके प्रमाण, वेळ व खर्चासह लिखित रेसिपी. एकदा घ्या, कायम ठेवा.',
              })}
            </p>
            {recipes.map((r, i) => {
              const owned = student.ownsRecipe(r.id)
              return (
                <Card
                  key={r.id}
                  as={Link}
                  to={'/recipe/' + r.id}
                  interactive
                  style={{ '--i': i }}
                  className="stagger flex items-center gap-3.5 p-3.5"
                >
                  <ProductIcon name={r.icon} tint={r.tint} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14.5px] font-semibold text-ink">{r.native}</p>
                    <p className="mt-0.5 truncate text-[12px] text-ink-3">{pick(r.title)}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-3 tnum">
                      {r.pages} {pick({ en: 'pages', hi: 'पन्ने', mr: 'पाने' })}
                    </p>
                  </div>
                  {owned ? (
                    <Badge tone="positive">
                      <CheckCircle2 className="size-3" strokeWidth={2.6} />
                      {t('courses.owned')}
                    </Badge>
                  ) : (
                    <span className="text-[14px] font-semibold text-ink tnum">{money(r.price)}</span>
                  )}
                </Card>
              )
            })}
          </div>
        )}

        {/* ------------------------------------------- residential batches --- */}
        {tab === 'batch' && (
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                {t('home.offlineTitle')}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{t('home.offlineBody')}</p>

              <p className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                {t('batch.includes')}
              </p>
              <ul className="mt-2 space-y-1.5">
                {pick(offlineIncludes).map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-ink-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.2} />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {batches.map((b, i) => (
              <Card key={b.id} style={{ '--i': i }} className="stagger p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{b.code}</p>
                    <p className="mt-0.5 text-[12.5px] text-ink-2 tnum">
                      {dateRange(b.start, b.end)} · {pick(b.venue)}
                    </p>
                  </div>
                  <Badge tone={b.status === 'open' ? 'brand' : 'neutral'}>
                    {b.status === 'open'
                      ? money(b.fee)
                      : pick({ en: 'Completed', hi: 'पूर्ण', mr: 'पूर्ण' })}
                  </Badge>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[12px] text-ink-3 tnum">
                    <span>
                      {b.seats - b.filled} {t('home.seats')}
                    </span>
                    <span>
                      {b.filled}/{b.seats}
                    </span>
                  </div>
                  <Meter value={b.filled} max={b.seats} className="mt-1.5" />
                </div>

                {b.status === 'open' && (
                  <Button as={Link} to={'/batch/' + b.id} block variant="secondary" className="mt-3.5">
                    {t('batch.apply')}
                    <ChevronRight className="size-4" strokeWidth={2.4} />
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </Screen>
    </>
  )
}
