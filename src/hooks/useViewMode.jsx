import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'godhade.view'

/* Logical CSS pixels, i.e. what the page actually sees on each device. */
export const DEVICES = [
  { id: 'iphone15', label: 'iPhone 15 Pro', w: 393, h: 852, radius: 54, island: true, indicator: true },
  { id: 'iphonese', label: 'iPhone SE', w: 375, h: 667, radius: 38, island: false, indicator: false },
  { id: 'pixel8', label: 'Pixel 8', w: 412, h: 915, radius: 44, punch: true, indicator: true },
  { id: 'ipadmini', label: 'iPad mini', w: 744, h: 1133, radius: 30, indicator: true },
]

const DEFAULTS = { mode: 'web', deviceId: 'iphone15', landscape: false }

function load() {
  let saved = DEFAULTS
  try {
    saved = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    /* private browsing */
  }
  // ?view=mobile / ?view=web wins, so a preview link opens in the right shape.
  const wanted = new URLSearchParams(window.location.search).get('view')
  return wanted === 'mobile' || wanted === 'web' ? { ...saved, mode: wanted } : saved
}

const Ctx = createContext(null)

export function ViewModeProvider({ children }) {
  const [state, setState] = useState(load)

  /* The frame is a desktop convenience — on a real phone it would just be a
     smaller phone inside a phone, so below 1024px we never offer it. */
  const [roomy, setRoomy] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
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
    return {
      ...state,
      device,
      roomy,
      framed: roomy && state.mode === 'mobile',
      setMode: (mode) => setState((s) => ({ ...s, mode })),
      setDevice: (deviceId) => setState((s) => ({ ...s, deviceId })),
      rotate: () => setState((s) => ({ ...s, landscape: !s.landscape })),
    }
  }, [state, roomy])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export default function useViewMode() {
  return useContext(Ctx)
}
