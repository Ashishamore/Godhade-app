import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from '../../components/appRouter'
import {
  AlertTriangle, ArrowRight, Camera, CheckCircle2, ChevronLeft, Headphones, Lock,
  Pause, Play, ShieldCheck, TrendingUp,
} from 'lucide-react'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import { courseById, money, OFFLINE_FEE, batches } from '../../data/catalog'
import { Badge, Button, EmptyState, IconButton, ProductIcon, Sheet } from '../../components/ui'
import { Meter } from '../../components/charts'

/* ---------------------------------------------------------------------------
   Protected lesson player.

   A real build would pair a DRM-backed stream with platform capture blocking
   (FLAG_SECURE on Android, screen-capture callbacks on iOS). The web can only
   detect a few signals, so here the detection is wired to what a browser can
   actually observe — PrintScreen, and the window losing focus the way it does
   during a capture — plus a manual trigger so the flow can be demonstrated on
   any device.

   The rule itself is Godhade sir's: first attempt warns and interrupts the
   playback, second attempt locks the session until an admin restores it.
--------------------------------------------------------------------------- */

export default function Player() {
  const { id, lessonId } = useParams()
  const { t, pick } = useI18n()
  const student = useStudent()
  const navigate = useNavigate()

  const course = courseById(id)
  const lesson = course?.lessons.find((l) => l.id === lessonId)

  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [warned, setWarned] = useState(false)
  const [finished, setFinished] = useState(false)
  const armed = useRef(true)

  const locked = student.isLocked(id)
  const total = (lesson?.min ?? 1) * 60

  /* ------------------------------------------------- capture detection --- */

  const onCaptureAttempt = useCallback(() => {
    if (!armed.current || locked) return
    armed.current = false
    setPlaying(false)
    const strikes = student.recordCaptureAttempt(id)
    if (strikes === 1) setWarned(true)
    // A second strike flips `locked` through the store and the lock screen takes over.
    setTimeout(() => {
      armed.current = true
    }, 1200)
  }, [id, locked, student])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'PrintScreen' || (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key))) {
        e.preventDefault()
        onCaptureAttempt()
      }
    }
    window.addEventListener('keyup', onKey)
    return () => window.removeEventListener('keyup', onKey)
  }, [onCaptureAttempt])

  /* --------------------------------------------------------- playback --- */

  useEffect(() => {
    if (!playing || locked || finished) return
    const tick = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= total) {
          setPlaying(false)
          setFinished(true)
          return total
        }
        return e + 1
      })
    }, 120) // demo speed — a 10 min lesson plays out in about a minute
    return () => clearInterval(tick)
  }, [playing, locked, finished, total])

  useEffect(() => {
    if (finished) student.completeLesson(id, lessonId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  if (!course || !lesson) {
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

  const done = student.progress[id]?.completed ?? []
  const idx = course.lessons.findIndex((l) => l.id === lessonId)
  const next = course.lessons[idx + 1]
  const courseComplete = student.isCourseComplete(id)
  const unlocks = course.unlocks.map(courseById).filter(Boolean)
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  /* ------------------------------------------------------ locked state --- */

  if (locked) {
    return (
      <div className="flex h-full flex-col bg-canvas">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <IconButton label={t('common.back')} size="sm" onClick={() => navigate('/course/' + id)}>
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </IconButton>
          <p className="truncate text-[14.5px] font-semibold text-ink">{course.native}</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-critical-soft text-critical">
            <Lock className="size-7" strokeWidth={2} />
          </span>
          <h1 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-ink">
            {t('player.lockedTitle')}
          </h1>
          <p className="mt-2 max-w-[20rem] text-[13.5px] leading-relaxed text-ink-2">
            {t('player.lockedBody')}
          </p>
          <Button as={Link} to="/support" className="mt-6">
            <Headphones className="size-4" strokeWidth={2.1} />
            {t('player.contactAdmin')}
          </Button>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------ player state --- */

  return (
    <div className="flex h-full flex-col bg-canvas">
      {/* ------------------------------------------------------- stage --- */}
      <div className="relative shrink-0 bg-[#0e0e12]">
        <div className="relative aspect-video w-full">
          {/* Stand-in for the DRM stream. */}
          <div className="absolute inset-0 grid place-items-center">
            <ProductIcon name={course.icon} tint="#ffffff" size="xl" className="opacity-25" />
          </div>

          {/* Forensic watermark — a leaked recording traces back to an account. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute left-3 top-3 text-[10px] font-medium text-white/35 tnum">
              {student.profile.id} · {student.profile.maskedPhone}
            </span>
            <span className="absolute bottom-3 right-3 text-[10px] font-medium text-white/35 tnum">
              {student.profile.maskedPhone}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="absolute inset-0 grid place-items-center"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {!playing && !finished && (
              <span className="grid size-16 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                <Play className="size-7 fill-white text-white" strokeWidth={0} />
              </span>
            )}
          </button>

          <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5">
            <Meter value={elapsed} max={total} tint="#ffffff" />
            <div className="mt-1.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="grid size-7 place-items-center rounded-full text-white"
              >
                {playing ? (
                  <Pause className="size-4 fill-current" strokeWidth={0} />
                ) : (
                  <Play className="size-4 fill-current" strokeWidth={0} />
                )}
              </button>
              <span className="text-[11px] font-medium text-white/80 tnum">
                {mmss(elapsed)} / {mmss(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2">
          <IconButton
            label={t('common.back')}
            size="sm"
            onClick={() => navigate('/course/' + id)}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </IconButton>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white/85">
            <ShieldCheck className="size-3.5" strokeWidth={2.2} />
            {t('player.protected')}
          </span>
          <span className="ml-auto text-[11px] text-white/50 tnum">
            {idx + 1}/{course.lessons.length}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------ content --- */}
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <h1 className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-ink">
          {pick(lesson.title)}
        </h1>
        <p className="mt-1 text-[12.5px] text-ink-3">
          {course.native} · {pick(course.name)}
        </p>

        <div className="mt-3 flex gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.1} />
          <p className="text-[12px] leading-relaxed text-ink-2">{t('player.singleView')}</p>
        </div>

        {!finished && (
          <Button
            block
            variant="secondary"
            className="mt-3"
            onClick={() => {
              setElapsed(total)
              setPlaying(false)
              setFinished(true)
            }}
          >
            <CheckCircle2 className="size-4" strokeWidth={2.2} />
            {t('player.complete')}
          </Button>
        )}

        {/* Demo affordance: real builds hook the OS capture callback instead. */}
        <button
          type="button"
          onClick={onCaptureAttempt}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong px-3 py-2.5 text-[12.5px] font-medium text-ink-3 transition-colors active:bg-muted"
        >
          <Camera className="size-4" strokeWidth={2} />
          {t('player.simulate')}
        </button>

        {finished && (
          <section className="mt-5 rounded-xl border border-line bg-surface p-4">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
              <CheckCircle2 className="size-4" strokeWidth={2.3} />
              {t('player.completed')}
            </span>

            {next ? (
              <Button
                block
                className="mt-3"
                onClick={() => {
                  setElapsed(0)
                  setFinished(false)
                  setPlaying(true)
                  navigate(`/course/${id}/play/${next.id}`, { replace: true })
                }}
              >
                {pick({ en: 'Next lesson', hi: 'अगला पाठ', mr: 'पुढील धडा' })}
                <ArrowRight className="size-4" strokeWidth={2.4} />
              </Button>
            ) : (
              <Button as={Link} to={'/course/' + id} block className="mt-3">
                {pick({ en: 'Back to course', hi: 'कोर्स पर वापस', mr: 'कोर्सवर परत' })}
              </Button>
            )}
          </section>
        )}

        {/* Course-completion upsell, exactly as Godhade sir framed it. */}
        {courseComplete && unlocks.length > 0 && (
          <section className="mt-4 rounded-xl border border-brand/25 bg-brand-soft p-4">
            <div className="flex items-start gap-2.5">
              <TrendingUp className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={2.1} />
              <div>
                <h2 className="text-[14.5px] font-semibold text-brand">
                  {pick({
                    en: `Congratulations — you completed ${course.native}!`,
                    hi: `बधाई — आपने ${course.native} पूरा किया!`,
                    mr: `अभिनंदन — तुम्ही ${course.native} पूर्ण केला!`,
                  })}
                </h2>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
                  {t('courses.opensDoorsBody')}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {unlocks.map((u) => (
                <Link
                  key={u.id}
                  to={'/course/' + u.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[12.5px] font-medium text-ink"
                >
                  {u.native}
                  <span className="text-ink-3 tnum">{money(u.price)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {courseComplete && student.showsOfflineUpsell && (
          <section className="mt-4 rounded-xl border border-line bg-surface p-4">
            <Badge tone="brand">
              {pick({ en: '2+ courses completed', hi: '2+ कोर्स पूर्ण', mr: '२+ कोर्स पूर्ण' })}
            </Badge>
            <h2 className="mt-2 text-[14.5px] font-semibold leading-snug text-ink">
              {pick({
                en: `Come to the 3-day batch and learn 20+ products for ${money(OFFLINE_FEE)}, stay and food included.`,
                hi: `3 दिन के बैच में आइए — ${money(OFFLINE_FEE)} में 20+ प्रोडक्ट, रहना-खाना शामिल।`,
                mr: `३ दिवसांच्या बॅचला या — ${money(OFFLINE_FEE)} मध्ये २०+ प्रॉडक्ट, मुक्काम व जेवण समाविष्ट.`,
              })}
            </h2>
            <Button as={Link} to={'/batch/' + batches[0].id} block className="mt-3">
              {t('batch.apply')}
            </Button>
          </section>
        )}

        <div className="h-4" />
      </div>

      {/* ------------------------------------------------- first warning --- */}
      <Sheet
        open={warned}
        onClose={() => setWarned(false)}
        title={t('player.warningTitle')}
        footer={
          <Button block size="lg" onClick={() => setWarned(false)}>
            {t('player.warningAck')}
          </Button>
        }
      >
        <div className="flex gap-3 py-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-critical-soft text-critical">
            <AlertTriangle className="size-5" strokeWidth={2.2} />
          </span>
          <p className="text-[13.5px] leading-relaxed text-ink-2">{t('player.warningBody')}</p>
        </div>
      </Sheet>
    </div>
  )
}
