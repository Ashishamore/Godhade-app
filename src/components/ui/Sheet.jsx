import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { IconButton } from './Button'
import { usePortalHost } from '../portal'

/* Bottom sheet on phones, centred dialog from `sm` up. Closes on backdrop
   press and on Escape; scroll is locked while open. */
export default function Sheet({ open, onClose, title, description, children, footer }) {
  const host = usePortalHost()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-end justify-center @wide:items-center">
      <div
        className="absolute inset-0 animate-[fade-in_0.2s_ease-out] bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={[
          'relative flex max-h-[88dvh] w-full flex-col bg-elevated',
          'rounded-t-3xl @wide:max-w-md @wide:rounded-3xl @wide:shadow-lift',
          'border-t border-line @wide:border',
          'animate-[fade-up_0.3s_var(--ease-out-soft)] @wide:animate-[pop_0.22s_var(--ease-out-soft)]',
        ].join(' ')}
      >
        <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-line @wide:hidden" />

        <header className="flex items-start gap-3 px-5 pt-4 pb-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
            {description && <p className="mt-0.5 text-[13px] text-ink-2">{description}</p>}
          </div>
          <IconButton label="Close" size="sm" onClick={onClose} className="-mt-1 -mr-1.5">
            <X className="size-[18px]" strokeWidth={2.25} />
          </IconButton>
        </header>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-2">{children}</div>

        {footer && (
          <footer className="border-t border-line px-5 pt-3 pb-safe-4 @wide:pb-4">{footer}</footer>
        )}
      </div>
    </div>,
    host ?? document.body,
  )
}
