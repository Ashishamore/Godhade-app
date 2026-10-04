export default function Chip({ active = false, icon, className = '', children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border',
        'px-3.5 h-9 text-[13px] font-medium select-none',
        'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.95]',
        active
          ? 'bg-ink text-canvas border-ink'
          : 'bg-surface text-ink-2 border-line hover:bg-muted hover:text-ink',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}

/** Horizontally scrolling chip rail that bleeds to the screen edges. */
export function ChipRail({ className = '', children }) {
  return (
    <div
      className={[
        'no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5',
        '[scroll-padding-inline:1rem] [scroll-snap-type:x_proximity]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
