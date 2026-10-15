import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Monitor, Moon, RotateCw, Smartphone, Sun } from 'lucide-react'
import useViewMode, { ADMIN_BASE, DEVICES } from '../hooks/useViewMode'
import { useAppTheme } from './theme'

function Toggle({ active, onClick, icon: Icon, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={[
        'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12.5px] font-medium transition-colors',
        active ? 'bg-brand-soft text-brand' : 'text-ink-2 hover:bg-muted hover:text-ink',
      ].join(' ')}
    >
      <Icon className="size-4" strokeWidth={2.1} />
      {children}
    </button>
  )
}

/* ---------------------------------------------------------------------------
   Prototype controls — desktop only.

   Lets the client flip between the two products in one link, and between a
   browser-width student app and the simulated handset.
--------------------------------------------------------------------------- */
export default function ViewToolbar() {
  const view = useViewMode()
  const theme = useAppTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (!view.roomy) return null

  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-1 rounded-xl border border-line bg-surface/95 p-1 shadow-pop backdrop-blur-xl">
      <Toggle
        active={!isAdmin}
        onClick={() => navigate(view.base)}
        icon={Smartphone}
        title="Student app"
      >
        Student app
      </Toggle>
      <Toggle
        active={isAdmin}
        onClick={() => navigate(ADMIN_BASE)}
        icon={LayoutDashboard}
        title="Admin panel"
      >
        Admin panel
      </Toggle>

      {!isAdmin && (
        <>
          <span className="mx-0.5 h-5 w-px bg-line" />

          <Toggle
            active={view.mode === 'web'}
            onClick={() => view.setMode('web')}
            icon={Monitor}
            title="Full browser width"
          >
            Web
          </Toggle>
          <Toggle
            active={view.mode === 'mobile'}
            onClick={() => view.setMode('mobile')}
            icon={Smartphone}
            title="Inside a phone frame"
          >
            Phone
          </Toggle>

          {view.framed && (
            <>
              <select
                value={view.device.id}
                onChange={(e) => view.setDevice(e.target.value)}
                aria-label="Device"
                className="h-8 rounded-lg border border-line bg-surface px-2 text-[12.5px] text-ink outline-none"
              >
                {DEVICES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={view.rotate}
                aria-label="Rotate"
                title="Rotate"
                className={[
                  'grid size-8 place-items-center rounded-lg transition-colors',
                  view.landscape ? 'bg-brand-soft text-brand' : 'text-ink-2 hover:bg-muted',
                ].join(' ')}
              >
                <RotateCw className="size-4" strokeWidth={2.1} />
              </button>
            </>
          )}
        </>
      )}

      <span className="mx-0.5 h-5 w-px bg-line" />

      <button
        type="button"
        onClick={() => theme.setMode(theme.isDark ? 'light' : 'dark')}
        aria-label="Toggle theme"
        title="Toggle theme"
        className="grid size-8 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-muted"
      >
        {theme.isDark ? (
          <Sun className="size-4" strokeWidth={2.1} />
        ) : (
          <Moon className="size-4" strokeWidth={2.1} />
        )}
      </button>
    </div>
  )
}
