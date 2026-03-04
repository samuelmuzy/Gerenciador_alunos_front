export function EmptyState({ label }: { label: string }) {
    return (
      <div className="flex flex-col items-center justify-center py-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/60">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
      </div>
    )
  }