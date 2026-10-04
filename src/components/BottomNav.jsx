import { NavLink } from 'react-router-dom'
import { TABS } from './nav'
import { Dot } from './ui'
import useI18n from '../i18n'

/** Primary navigation for phones and tablets. Sits in flow, so content never
    hides underneath it, and reserves the device gesture area via `pb-safe`. */
export default function BottomNav({ className = '' }) {
  const { t } = useI18n()

  return (
    <nav
      aria-label="Primary"
      className={[
        'shrink-0 border-t border-line bg-surface/85 backdrop-blur-xl pb-safe',
        className,
      ].join(' ')}
    >
      <ul className="mx-auto flex max-w-[680px] items-stretch">
        {TABS.map(({ to, label, icon: Icon, badge, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className="group flex h-16 flex-col items-center justify-center gap-1 outline-offset-[-4px]"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      'relative grid h-7 w-14 place-items-center rounded-full',
                      'transition-[background-color,transform] duration-250 ease-[var(--ease-out-soft)]',
                      'group-active:scale-90',
                      isActive ? 'bg-brand-soft' : 'bg-transparent',
                    ].join(' ')}
                  >
                    <Icon
                      className={[
                        'size-[21px] transition-colors duration-200',
                        isActive ? 'text-brand' : 'text-ink-3 group-hover:text-ink-2',
                      ].join(' ')}
                      strokeWidth={isActive ? 2.4 : 1.9}
                    />
                    {badge ? (
                      <Dot count={badge} className="absolute -top-0.5 right-3 ring-2 ring-surface" />
                    ) : null}
                  </span>
                  <span
                    className={[
                      'text-[10.5px] leading-none tracking-[0.01em] transition-colors duration-200',
                      isActive ? 'font-semibold text-brand' : 'font-medium text-ink-3',
                    ].join(' ')}
                  >
                    {t(label)}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
