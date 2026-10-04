/* Flat mark: a milk drop inside a rounded square. No gradients. */
export default function Logo({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#c2410c" />
      <path
        d="M32 15c0 0-12 13.5-12 21.2A12 12 0 0 0 44 36.2C44 28.5 32 15 32 15Z"
        fill="#ffffff"
      />
      <path d="M32 31c-3.2 2.4-4.8 4.6-4.8 7.2a4.8 4.8 0 0 0 9.6 0c0-2.6-1.6-4.8-4.8-7.2Z" fill="#c2410c" />
    </svg>
  )
}
