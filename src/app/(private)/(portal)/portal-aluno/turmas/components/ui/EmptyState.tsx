
export function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 py-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
            <Icon className="w-5 h-5 text-slate-300" />
            <p className="text-xs text-slate-400 font-medium">{label}</p>
        </div>
    )
}