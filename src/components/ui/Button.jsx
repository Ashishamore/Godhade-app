const VARIANTS = {
  primary: 'bg-brand text-brand-ink hover:bg-brand-hover shadow-card',
  secondary: 'bg-surface text-ink border border-line hover:bg-muted',
  soft: 'bg-brand-soft text-brand hover:brightness-[0.97]',
  ghost: 'text-ink-2 hover:bg-muted hover:text-ink',
  critical: 'bg-critical-soft text-critical hover:brightness-[0.97]',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-13 px-5 text-[15px] gap-2 rounded-2xl',
}

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={[
        'inline-flex items-center justify-center font-medium select-none',
        'transition-[background-color,transform,box-shadow,color] duration-150',
        'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45',
        VARIANTS[variant],
        SIZES[size],
        block ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Square icon-only button — used in headers and on cover art. */
export function IconButton({ label, size = 'md', variant = 'ghost', className = '', children, ...rest }) {
  const box = size === 'sm' ? 'size-9' : 'size-11'
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-full',
        'transition-[background-color,transform,color] duration-150 active:scale-[0.92]',
        VARIANTS[variant],
        box,
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
