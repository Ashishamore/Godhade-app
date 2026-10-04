import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { courseById, courses } from '../data/catalog'
import {
  initialApplication,
  initialProgress,
  initialPurchases,
  initialSupportThread,
  student as profile,
} from '../data/student'

/* ---------------------------------------------------------------------------
   Live demo state for the signed-in student.

   Kept in memory on purpose: a client walking through the prototype can buy a
   course, finish it, trip the content-protection rules and watch the upsells
   appear, then reload to a clean slate.
--------------------------------------------------------------------------- */

const Ctx = createContext(null)

export function StudentProvider({ children }) {
  const [purchases, setPurchases] = useState(initialPurchases)
  const [progress, setProgress] = useState(initialProgress)
  const [application, setApplication] = useState(initialApplication)
  const [thread, setThread] = useState(initialSupportThread)

  /* ------------------------------------------------------------ queries --- */

  const ownsCourse = useCallback(
    (id) => purchases.some((p) => p.kind === 'course' && p.itemId === id),
    [purchases],
  )
  const ownsRecipe = useCallback(
    (id) => purchases.some((p) => p.kind === 'recipe' && p.itemId === id),
    [purchases],
  )

  const courseProgress = useCallback(
    (id) => {
      const course = courseById(id)
      const done = progress[id]?.completed?.length ?? 0
      const total = course?.lessons.length ?? 0
      return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
    },
    [progress],
  )

  const isCourseComplete = useCallback(
    (id) => {
      const { done, total } = courseProgress(id)
      return total > 0 && done === total
    },
    [courseProgress],
  )

  const completedCount = useMemo(
    () => courses.filter((c) => ownsCourse(c.id) && isCourseComplete(c.id)).length,
    [ownsCourse, isCourseComplete],
  )

  /* The residential upsell video only unlocks after two finished courses —
     the rule Godhade sir asked for. Applying is never gated on it. */
  const showsOfflineUpsell = completedCount >= 2

  const attendedOffline = application?.status === 'attended'

  /* ------------------------------------------------------------ mutations --- */

  const buy = useCallback((kind, itemId, amount) => {
    const seq = Math.floor(Math.random() * 900 + 100)
    setPurchases((prev) => [
      {
        id: `ORD-${9800 + seq}`,
        kind,
        itemId,
        amount,
        date: new Date().toISOString().slice(0, 10),
        invoice: `INV-2026-0${600 + seq}`,
      },
      ...prev,
    ])
    if (kind === 'course') {
      setProgress((prev) => ({ ...prev, [itemId]: prev[itemId] ?? { completed: [], locked: false, strikes: 0 } }))
    }
  }, [])

  const completeLesson = useCallback((courseId, lessonId) => {
    setProgress((prev) => {
      const cur = prev[courseId] ?? { completed: [], locked: false, strikes: 0 }
      if (cur.completed.includes(lessonId)) return prev
      return { ...prev, [courseId]: { ...cur, completed: [...cur.completed, lessonId] } }
    })
  }, [])

  /** Returns the strike count after recording a capture attempt. */
  const recordCaptureAttempt = useCallback((courseId) => {
    let next = 0
    setProgress((prev) => {
      const cur = prev[courseId] ?? { completed: [], locked: false, strikes: 0 }
      next = cur.strikes + 1
      return { ...prev, [courseId]: { ...cur, strikes: next, locked: next >= 2 } }
    })
    return next
  }, [])

  const unlockCourse = useCallback((courseId) => {
    setProgress((prev) => {
      const cur = prev[courseId]
      if (!cur) return prev
      return { ...prev, [courseId]: { ...cur, locked: false, strikes: 0 } }
    })
  }, [])

  const isLocked = useCallback((courseId) => !!progress[courseId]?.locked, [progress])

  const sendMessage = useCallback((text) => {
    setThread((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, from: 'student', text, at: new Date().toISOString() },
    ])
  }, [])

  const value = useMemo(
    () => ({
      profile,
      purchases,
      progress,
      application,
      setApplication,
      thread,
      ownsCourse,
      ownsRecipe,
      courseProgress,
      isCourseComplete,
      completedCount,
      showsOfflineUpsell,
      attendedOffline,
      buy,
      completeLesson,
      recordCaptureAttempt,
      unlockCourse,
      isLocked,
      sendMessage,
    }),
    [
      purchases, progress, application, thread, ownsCourse, ownsRecipe, courseProgress,
      isCourseComplete, completedCount, showsOfflineUpsell, attendedOffline, buy,
      completeLesson, recordCaptureAttempt, unlockCourse, isLocked, sendMessage,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export default function useStudent() {
  return useContext(Ctx)
}
