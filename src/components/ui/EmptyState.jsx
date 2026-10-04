export default function EmptyState({ icon, title, body, action }) {
  return (
    <div className="animate-[fade-up_0.3s_var(--ease-out-soft)] flex flex-col items-center px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-muted text-ink-3">{icon}</div>
      <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-[16rem] text-[13px] leading-relaxed text-ink-2">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
