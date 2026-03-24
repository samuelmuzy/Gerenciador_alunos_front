
export function Tag({ children, color = "slate" }: { children: React.ReactNode; color?: "slate" | "amber" | "purple" | "sky" | "rose" | "violetMuted" | "fuchsiaMuted" }) {
    const styles: Record<string, string> = {
        slate: "bg-slate-100 text-slate-500 border-slate-200",
        amber: "bg-amber-50  text-amber-600  border-amber-200",
        purple: "bg-violet-50 text-violet-700 border-violet-100",
        sky: "bg-sky-50    text-sky-600    border-sky-200",
        rose: "bg-rose-50   text-rose-500   border-rose-200",
        violetMuted: "bg-violet-50/80 text-violet-700 border-violet-100/90",
        fuchsiaMuted: "bg-fuchsia-50/80 text-fuchsia-800 border-fuchsia-100/90",
    }
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${styles[color]}`}>
            {children}
        </span>
    )
}