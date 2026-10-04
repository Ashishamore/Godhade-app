import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BarChart3, BookOpen, CalendarRange, CreditCard, FileText, Headphones, Megaphone,
  Menu, Moon, Search, Settings, Sun, UserCheck, Users, X,
} from 'lucide-react'
import Logo from '../Logo'
import { useAppTheme } from '../theme'
import { admin, applications, supportQueue } from '../../data/admin'
import { Avatar } from '../ui'

const pending = applications.filter((a) => a.status === 'pending').length
const unread = supportQueue.filter((s) => s.unread).length

export const SECTIONS = [
  {
    label: 'Overview',
    items: [{ to: '/admin', end: true, label: 'Dashboard', icon: BarChart3 }],
  },
  {
    label: 'Admissions',
    items: [
      { to: '/admin/admissions', label: 'Applications', icon: UserCheck, badge: pending },
      { to: '/admin/batches', label: 'Batches', icon: CalendarRange },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/admin/students', label: 'Students', icon: Users },
      { to: '/admin/support', label: 'Support', icon: Headphones, badge: unread },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/courses', label: 'Courses', icon: BookOpen },
      { to: '/admin/recipes', label: 'Recipes', icon: FileText },
    ],
  },
  {
    label: 'Business',
    items: [
      { to: '/admin/payments', label: 'Payments', icon: CreditCard },
      { to: '/admin/marketing', label: 'Marketing', icon: Megaphone },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function SideNav({ onNavigate }) {
  return (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
        <Logo className="size-8 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
            Godhade Dairy
          </p>
          <p className="truncate text-[11px] text-ink-3">Admin console</p>
        </div>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
        {SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] transition-colors',
                        isActive
                          ? 'bg-brand-soft font-semibold text-brand'
                          : 'font-medium text-ink-2 hover:bg-muted hover:text-ink',
                      ].join(' ')
                    }
                  >
                    <item.icon className="size-[18px] shrink-0" strokeWidth={1.9} />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.badge ? (
                      <span className="shrink-0 rounded-full bg-critical px-1.5 text-[10.5px] font-bold leading-[18px] text-white tnum">
                        {item.badge}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 border-t border-line px-3 py-3">
        <Avatar name={admin.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold text-ink">{admin.name}</p>
          <p className="truncate text-[11px] text-ink-3">{admin.role}</p>
        </div>
      </div>
    </nav>
  )
}

export default function AdminShell() {
  const theme = useAppTheme()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const title =
    SECTIONS.flatMap((s) => s.items).find((i) =>
      i.end ? pathname === i.to : pathname.startsWith(i.to),
    )?.label ?? 'Dashboard'

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas">
      {/* ------------------------------------------------- desktop rail --- */}
      <aside className="hidden w-[244px] shrink-0 border-r border-line bg-surface lg:block">
        <SideNav />
      </aside>

      {/* -------------------------------------------------- mobile drawer --- */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 w-[260px] border-r border-line bg-surface">
            <SideNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ----------------------------------------------------- top bar --- */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-muted lg:hidden"
          >
            {open ? <X className="size-5" strokeWidth={2.1} /> : <Menu className="size-5" strokeWidth={2.1} />}
          </button>

          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h1>

          <div className="ml-auto flex items-center gap-2">
            <label className="hidden h-9 items-center gap-2 rounded-lg border border-line bg-canvas px-3 md:flex">
              <Search className="size-4 text-ink-3" strokeWidth={2.1} />
              <input
                placeholder="Search students, payments…"
                className="w-52 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
              />
            </label>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => theme.setMode(theme.isDark ? 'light' : 'dark')}
              className="grid size-9 place-items-center rounded-lg border border-line text-ink-2 hover:bg-muted"
            >
              {theme.isDark ? (
                <Sun className="size-[17px]" strokeWidth={2} />
              ) : (
                <Moon className="size-[17px]" strokeWidth={2} />
              )}
            </button>
          </div>
        </header>

        <main className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
