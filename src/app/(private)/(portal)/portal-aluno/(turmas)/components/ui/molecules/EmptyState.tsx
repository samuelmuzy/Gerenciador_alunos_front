
export function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-violet-200/70 bg-violet-50/20 py-8">
            <Icon className="h-5 w-5 text-violet-300" />
            <p className="text-xs font-medium text-slate-500">{label}</p>
        </div>
    )
}