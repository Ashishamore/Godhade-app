import BrandIcon from './BrandIcon'

/** Quick links to Godhade sir's channels. */
export default function SocialRow({ links }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {links.map((l) => (
        <a
          key={l.id}
          href={l.url}
          className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface px-1 py-3 transition-colors active:bg-muted"
        >
          <BrandIcon name={l.icon} className="size-5 text-ink-2" />
          <span className="text-[10.5px] font-medium text-ink-3">{l.label}</span>
        </a>
      ))}
    </div>
  )
}
