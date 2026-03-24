export function InfoRow({ icon: Icon, label, value, highlight }: {
    icon: React.ElementType; label: string; value: string; highlight?: boolean
  }) {
    return (
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${highlight ? "bg-rose-50 border border-rose-100" : "bg-slate-50 border border-slate-100"}`}>
          <Icon className={`w-3.5 h-3.5 ${highlight ? "text-rose-400" : "text-slate-400"}`} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
          <p className={`text-sm font-semibold mt-0.5 ${highlight ? "text-rose-600" : "text-slate-700"}`}>{value}</p>
        </div>
      </div>
    )
  }