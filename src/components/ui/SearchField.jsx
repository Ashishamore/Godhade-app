import { Search, X } from 'lucide-react'

export default function SearchField({
  value,
  onChange,
  placeholder = 'Search',
  autoFocus = false,
  className = '',
  trailing,
}) {
  return (
    <div
      className={[
        'flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5',
        'transition-[border-color,box-shadow] duration-150',
        'focus-within:border-brand focus-within:shadow-[0_0_0_3px_var(--c-brand-soft)]',
        className,
      ].join(' ')}
    >
      <Search className="size-[18px] shrink-0 text-ink-3" strokeWidth={2.25} />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        enterKeyHint="search"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="grid size-6 place-items-center rounded-full bg-muted text-ink-2 active:scale-90"
        >
          <X className="size-3.5" strokeWidth={2.5} />
        </button>
      ) : (
        trailing
      )}
    </div>
  )
}
