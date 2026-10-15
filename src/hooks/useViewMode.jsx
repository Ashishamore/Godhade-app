import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const KEY = 'godhade.view'

/* Logical CSS pixels, i.e. what the page actually sees on each device. */
export const DEVICES = [
  { id: 'iphone15', label: 'iPhone 15 Pro', w: 393, h: 852, radius: 54, island: true, indicator: true },
  { id: 'iphonese', label: 'iPhone SE', w: 375, h: 667, radius: 38, island: false, indicator: false },
  { id: 'pixel8', label: 'Pixel 8', w: 412, h: 915, radius: 44, punch: true, indicator: true },
  { id: 'ipadmini', label: 'iPad mini', w: 744, h: 1133, radius: 30, indicator: true },
]

/* URLs are /<role>/<view>/...
   The student app has two views over the same screens: /student/mobile is the
   phone frame, /student/web is full browser width. The admin console is
   web-only, so it has the one view. */
export const BASES = { mobile: '/student/mobile', web: '/student/web' }
export const ADMIN_BASE = '/admin/web'

const BASE_RE = /^\/student\/(mobile|web)(?=\/|$)/

export function modeFromPath(pathname) {
  return pathname.match(BASE_RE)?.[1] ?? null
}

/** '/student/mobile/course/khawa' → '/course/khawa' */
export function stripBase(pathname) {
  return pathname.replace(BASE_RE, '') || '/'
}

const DESKTOP = '(min-width: 1024px) and (hover: hover) and (pointer: fine)'

const DEFAULTS = { mode: 'web', deviceId: 'iphone15', landscape: false }

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    /* private browsing */
    return DEFAULTS
  }
}

const Ctx = createContext(null)

export function ViewModeProvider({ children }) {
  const [state, setState] = useState(load)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const urlMode = modeFromPath(pathname)

  /* Remember the last student view, so '/' and the admin's "Student app"
     button return to it. */
  useEffect(() => {
    if (urlMode) setState((s) => (s.mode === urlMode ? s : { ...s, mode: urlMode }))
  }, [urlMode])

  /* The frame is a desktop convenience — on a real phone or tablet it would
     just be a smaller phone inside the device. So it needs a wide screen *and*
     a mouse; touch devices always get the app at their own size. */
  const [roomy, setRoomy] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = (e) => setRoomy(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* private browsing — the preference just won't survive a reload */
    }
  }, [state])

  const value = useMemo(() => {
    const device = DEVICES.find((d) => d.id === state.deviceId) ?? DEVICES[0]
    const mode = urlMode ?? state.mode
    return {
      ...state,
      mode,
      base: BASES[mode],
      device,
      roomy,
      framed: roomy && mode === 'mobile',
      // Switching view keeps you on the same screen, just under the other prefix.
      setMode: (next) => {
        if (urlMode) navigate(BASES[next] + stripBase(pathname).replace(/^\/$/, '') + search)
        else setState((s) => ({ ...s, mode: next }))
      },
      setDevice: (deviceId) => setState((s) => ({ ...s, deviceId })),
      rotate: () => setState((s) => ({ ...s, landscape: !s.landscape })),
    }
  }, [state, roomy, urlMode, pathname, search, navigate])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export default function useViewMode() {
  return useContext(Ctx)
}

/** '/student/mobile' or '/student/web' — whichever the student app is mounted under. */
export function useAppBase() {
  return useContext(Ctx).base
}
