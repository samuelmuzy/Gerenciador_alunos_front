
export function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">
            {children}
        </h3>
    )
}