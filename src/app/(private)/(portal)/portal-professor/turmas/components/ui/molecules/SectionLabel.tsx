export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">
        {children}
      </p>
    )
  }