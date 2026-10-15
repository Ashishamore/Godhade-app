import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import { PortalContext } from './portal'
import { useAppTheme } from './theme'
import { stripBase } from '../hooks/useViewMode'

const ShellContext = createContext({ scrolled: false, theme: null })
export const useShell = () => useContext(ShellContext)

/* Routes that take over the whole screen — the tab bar would only get in the
   way of a video player or a conversation. */
const FULL_BLEED = [/^\/course\/[^/]+\/play\//, /^\/support$/]

/* ---------------------------------------------------------------------------
   The student app shell.

   One scroll container for everything. Keeping scrolling inside <main> rather
   than on the document is what makes the sticky headers and the tab bar behave
   like a native app instead of a web page.
--------------------------------------------------------------------------- */
export default function AppShell() {
  const theme = useAppTheme()
  const { pathname } = useLocation()
  const scroller = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  // Overlays portal into this element so they stay inside the phone frame.
  const [host, setHost] = useState(null)

  const fullBleed = FULL_BLEED.some((re) => re.test(stripBase(pathname)))

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setScrolled(false)
  }, [pathname])

  return (
    <ShellContext.Provider value={{ scrolled, theme }}>
      <PortalContext.Provider value={host}>
        <div
          ref={setHost}
          className="@container relative flex h-full flex-col overflow-hidden bg-canvas"
        >
          <main
            ref={scroller}
            onScroll={(e) => {
              const past = e.currentTarget.scrollTop > 4
              if (past !== scrolled) setScrolled(past)
            }}
            className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            <div key={pathname} className="animate-fade-in mx-auto h-full w-full max-w-[560px] @wide:max-w-[720px] @desk:max-w-[960px]">
              <Outlet />
            </div>
          </main>

          {!fullBleed && <BottomNav />}
        </div>
      </PortalContext.Provider>
    </ShellContext.Provider>
  )
}
