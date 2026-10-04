import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Circle, Clock, Lock, PlayCircle, ShieldCheck, Star,
  TrendingUp, Users,
} from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import { courseById, courses, money, OFFLINE_FEE, batches } from '../../data/catalog'
import { Badge, Button, Card, EmptyState, ProductIcon, Sheet } from '../../components/ui'
import { Meter } from '../../components/charts'

export default function CourseDetail() {
  const { id } = useParams()
  const { t, pick } = useI18n()
  const student = useStudent()
  const navigate = useNavigate()
  const [checkout, setCheckout] = useState(false)
  const [paid, setPaid] = useState(false)

  const course = courseById(id)
  if (!course) {
    return (
      <EmptyState
        title={t('courses.noResults')}
        body={t('courses.noResultsBody')}
        action={
          <Button as={Link} to="/courses" size="sm">
            {t('courses.title')}
          </Button>
        }
      />
    )
  }

  const owned = student.ownsCourse(course.id)
  const progress = student.courseProgress(course.id)
  const complete = student.isCourseComplete(course.id)
  const done = student.progress[course.id]?.completed ?? []
  const unlocks = course.unlocks.map(courseById).filter(Boolean)
  const nextLesson = course.lessons.find((l) => !done.includes(l.id)) ?? course.lessons[0]

  const confirm = () => {
    student.buy('course', course.id, course.price)
    setPaid(true)
  }

  return (
    <>
      <ScreenHeader back title={course.native} subtitle={pick(course.name)} />

      <Screen className="space-y-6">
        {/* ----------------------------------------------------- overview --- */}
        <section className="flex gap-4">
          <ProductIcon name={course.icon} tint={course.tint} size="xl" />
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] leading-relaxed text-ink-2">{pick(course.tagline)}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-3 tnum">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" strokeWidth={2} />
                {course.durationMin} {t('common.min')}
              </span>
              <span className="inline-flex items-center gap-1">
                <PlayCircle className="size-3.5" strokeWidth={2} />
                {course.lessons.length} {t('courses.lessons')}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="size-3.5" strokeWidth={2} />
                {course.learners} {t('courses.enrolled')}
              </span>
              {course.rating > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5 fill-current text-gold" strokeWidth={0} />
                  {course.rating}
                </span>
              )}
            </div>
          </div>
        </section>

        {owned && progress.total > 0 && (
          <Card className="p-3.5">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="font-medium text-ink">
                {complete ? t('player.completed') : t('home.continue')}
              </span>
              <span className="text-ink-3 tnum">
                {progress.done}/{progress.total}
              </span>
            </div>
            <Meter value={progress.pct} className="mt-2" />
          </Card>
        )}

        {/* ----------------------------------------------- what you learn --- */}
        {pick(course.outcomes).length > 0 && (
          <section>
            <SectionTitle title={t('courses.whatYouLearn')} />
            <ul className="space-y-2">
              {pick(course.outcomes).map((o) => (
                <li key={o} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.2} />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* --------------------------------------------------- lesson list --- */}
        <section>
          <SectionTitle title={t('courses.lessonList')} />
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {course.lessons.map((l, i) => {
              const isDone = done.includes(l.id)
              const Row = owned ? Link : 'div'
              return (
                <Row
                  key={l.id}
                  {...(owned ? { to: `/course/${course.id}/play/${l.id}` } : {})}
                  className={[
                    'flex items-center gap-3 px-3.5 py-3',
                    owned ? 'transition-colors active:bg-muted' : '',
                  ].join(' ')}
                >
                  <span className="w-5 shrink-0 text-center text-[12px] font-semibold text-ink-3 tnum">
                    {i + 1}
                  </span>
                  {owned ? (
                    isDone ? (
                      <CheckCircle2 className="size-[18px] shrink-0 text-brand" strokeWidth={2.2} />
                    ) : (
                      <Circle className="size-[18px] shrink-0 text-ink-3" strokeWidth={2} />
                    )
                  ) : (
                    <Lock className="size-4 shrink-0 text-ink-3" strokeWidth={2} />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] text-ink">{pick(l.title)}</span>
                  </span>
                  <span className="shrink-0 text-[12px] text-ink-3 tnum">
                    {l.min} {t('common.min')}
                  </span>
                </Row>
              )
            })}
          </div>
        </section>

        {/* ------------------------------------------- upsell: opens doors --- */}
        {complete && unlocks.length > 0 && (
          <section className="rounded-xl border border-brand/25 bg-brand-soft p-4">
            <div className="flex items-start gap-2.5">
              <TrendingUp className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={2.1} />
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold text-brand">{t('courses.opensDoors')}</h2>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
                  {t('courses.opensDoorsBody')}
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {unlocks.map((u) => (
                <Link
                  key={u.id}
                  to={'/course/' + u.id}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 transition-colors active:bg-muted"
                >
                  <ProductIcon name={u.icon} tint={u.tint} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">{u.native}</span>
                    <span className="block truncate text-[11.5px] text-ink-3">{pick(u.name)}</span>
                  </span>
                  {student.ownsCourse(u.id) ? (
                    <Badge tone="positive">{t('courses.owned')}</Badge>
                  ) : (
                    <span className="text-[13px] font-semibold text-ink tnum">{money(u.price)}</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------ upsell: residential (2+ courses) --- */}
        {complete && student.showsOfflineUpsell && (
          <section className="rounded-xl border border-line bg-surface p-4">
            <Badge tone="brand">
              {pick({ en: 'Unlocked for you', hi: 'आपके लिए खुला', mr: 'तुमच्यासाठी खुले' })}
            </Badge>
            <h2 className="mt-2 text-[15.5px] font-semibold leading-snug text-ink">
              {pick({
                en: `You have finished ${student.completedCount} courses. The 3-day batch teaches 20+ products for ${money(OFFLINE_FEE)}.`,
                hi: `आपने ${student.completedCount} कोर्स पूरे किए। 3 दिन के बैच में ${money(OFFLINE_FEE)} में 20+ प्रोडक्ट।`,
                mr: `तुम्ही ${student.completedCount} कोर्स पूर्ण केले. ३ दिवसांच्या बॅचमध्ये ${money(OFFLINE_FEE)} मध्ये २०+ प्रॉडक्ट.`,
              })}
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
              {pick({
                en: 'Stay and all meals included. Buying each product separately would cost far more.',
                hi: 'ठहरना और भोजन शामिल। अलग-अलग ख़रीदने पर ख़र्च कहीं ज़्यादा।',
                mr: 'मुक्काम व जेवण समाविष्ट. वेगवेगळे घेतल्यास खर्च खूप जास्त.',
              })}
            </p>
            <Button as={Link} to={'/batch/' + batches[0].id} block className="mt-3.5">
              {t('batch.apply')}
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </Button>
          </section>
        )}
      </Screen>

      {/* ------------------------------------------------------- buy bar --- */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-surface px-4 py-3">
        {owned ? (
          <Button
            as={Link}
            to={`/course/${course.id}/play/${nextLesson.id}`}
            size="lg"
            block
            disabled={student.isLocked(course.id)}
          >
            {student.isLocked(course.id) ? (
              <>
                <Lock className="size-4" strokeWidth={2.4} />
                {t('player.lockedTitle')}
              </>
            ) : progress.done > 0 ? (
              t('courses.continue')
            ) : (
              t('courses.start')
            )}
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="text-[17px] font-semibold text-ink tnum">{money(course.price)}</p>
              <p className="text-[11px] text-ink-3">
                {pick({ en: 'one-time', hi: 'एक बार', mr: 'एकदाच' })}
              </p>
            </div>
            <Button size="lg" className="ml-auto flex-1 @wide:max-w-56" onClick={() => setCheckout(true)}>
              {t('courses.buy')}
            </Button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------ checkout --- */}
      <Sheet
        open={checkout}
        onClose={() => {
          setCheckout(false)
          setPaid(false)
        }}
        title={paid ? t('batch.submitted') : t('courses.buy')}
        description={paid ? undefined : course.native + ' · ' + pick(course.name)}
        footer={
          paid ? (
            <Button
              block
              size="lg"
              onClick={() => {
                setCheckout(false)
                navigate(`/course/${course.id}/play/${course.lessons[0].id}`)
              }}
            >
              {t('courses.start')}
            </Button>
          ) : (
            <Button block size="lg" onClick={confirm}>
              {pick({ en: 'Pay with Razorpay', hi: 'Razorpay से भुगतान', mr: 'Razorpay ने भरा' })}{' '}
              {money(course.price)}
            </Button>
          )
        }
      >
        {paid ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="animate-pop grid size-14 place-items-center rounded-full bg-positive-soft text-positive">
              <CheckCircle2 className="size-7" strokeWidth={2.2} />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">
              {pick({ en: 'Course unlocked', hi: 'कोर्स खुल गया', mr: 'कोर्स खुला झाला' })}
            </p>
            <p className="mt-1 max-w-[19rem] text-[13px] leading-relaxed text-ink-2">
              {pick({
                en: 'The invoice is in your purchase history. Your recording is ready to watch.',
                hi: 'बिल ख़रीद इतिहास में है। रिकॉर्डिंग देखने के लिए तैयार है।',
                mr: 'बिल खरेदी इतिहासात आहे. रेकॉर्डिंग पाहण्यास तयार आहे.',
              })}
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-1">
            <dl className="space-y-2 rounded-lg bg-muted px-4 py-3 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-2">{pick(course.name)}</dt>
                <dd className="font-medium text-ink tnum">{money(course.price)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="font-semibold text-ink">{t('common.total')}</dt>
                <dd className="font-semibold text-ink tnum">{money(course.price)}</dd>
              </div>
            </dl>

            <div className="flex gap-2.5 rounded-lg border border-line px-3.5 py-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.1} />
              <p className="text-[12px] leading-relaxed text-ink-2">
                {t('player.singleView')}.{' '}
                {pick({
                  en: 'Screen recording is blocked and the session locks after two attempts.',
                  hi: 'स्क्रीन रिकॉर्डिंग बंद है, दो कोशिशों पर सेशन लॉक हो जाएगा।',
                  mr: 'स्क्रीन रेकॉर्डिंग बंद आहे, दोन प्रयत्नांनंतर सेशन लॉक होईल.',
                })}
              </p>
            </div>

            <p className="text-[11.5px] leading-relaxed text-ink-3">
              {pick({
                en: 'Prototype checkout — Razorpay is not connected and no payment is taken.',
                hi: 'प्रोटोटाइप चेकआउट — Razorpay जुड़ा नहीं, कोई भुगतान नहीं।',
                mr: 'प्रोटोटाइप चेकआउट — Razorpay जोडलेले नाही, पैसे घेतले जात नाहीत.',
              })}
            </p>
          </div>
        )}
      </Sheet>
    </>
  )
}
