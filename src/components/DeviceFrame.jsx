import { useEffect, useState } from 'react'
import useViewMode from '../hooks/useViewMode'
import StatusBar from './StatusBar'
import ViewToolbar from './ViewToolbar'

const BEZEL = 11 // px of chassis around the screen
const MARGIN = 72 // breathing room before we start scaling the device down

export default function DeviceFrame({ children }) {
  const { framed, device, landscape } = useViewMode()

  const w = landscape ? device.h : device.w
  const h = landscape ? device.w : device.h

  /* Shrink the whole device to fit short laptop screens rather than clipping. */
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!framed) return
    const fit = () =>
      setScale(
        Math.min(
          1,
          (window.innerHeight - MARGIN) / (h + BEZEL * 2),
          (window.innerWidth - MARGIN) / (w + BEZEL * 2),
        ),
      )
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [framed, w, h])

  if (!framed) {
    return (
      <>
        <div className="h-dvh">{children}</div>
        <ViewToolbar />
      </>
    )
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-workspace">
      <div className="flex h-full items-center justify-center">
        <div style={{ transform: `scale(${scale})` }} className="transition-transform duration-200">
          {/* Chassis: one flat dark band and a soft drop shadow. Nothing else —
              fake buttons and antennae only make the preview look busy. */}
          <div
            className="relative bg-[#0e0e12] ring-1 ring-black/10 dark:ring-white/10 shadow-[0_32px_64px_-24px_rgb(10_10_16_/_0.45)]"
            style={{ padding: BEZEL, borderRadius: device.radius + BEZEL }}
          >
            {/* Screen — this is the viewport the app believes it has. */}
            <div
              className="relative flex flex-col overflow-hidden bg-canvas"
              style={{
                width: w,
                height: h,
                borderRadius: device.radius,
                // Simulate the hardware insets the app reads via env().
                '--inset-t': '0px',
                '--inset-b': device.indicator ? '18px' : '0px',
              }}
            >
              <StatusBar />

              <div className="relative min-h-0 flex-1">{children}</div>

              {device.island && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-2 z-[60] h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black"
                />
              )}
              {device.punch && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-2.5 z-[60] size-[14px] -translate-x-1/2 rounded-full bg-black"
                />
              )}
              {device.indicator && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[7px] left-1/2 z-[60] h-[5px] w-[132px] -translate-x-1/2 rounded-full bg-ink/70"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <ViewToolbar />
    </div>
  )
}
