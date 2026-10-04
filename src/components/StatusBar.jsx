import { useEffect, useState } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'

/** Simulated handset status bar — decoration for the device frame only. */
export default function StatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20_000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative z-40 flex h-11 shrink-0 items-center justify-between px-7 text-ink">
      <span className="text-[14px] font-semibold tracking-[-0.01em] tnum">
        {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span className="flex items-center gap-1.5">
        <Signal className="size-[15px]" strokeWidth={2.6} />
        <Wifi className="size-[15px]" strokeWidth={2.6} />
        <BatteryFull className="size-[19px]" strokeWidth={1.9} />
      </span>
    </div>
  )
}
