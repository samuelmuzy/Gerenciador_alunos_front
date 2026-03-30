export function StatCard({ icon: Icon, label, value, color }: {
    icon: React.ElementType; label: string; value: string | number
    color: "purple" | "sky" | "emerald" | "amber"
  }) {
    const colors = {
      purple:  "bg-violet-50  border-violet-100  text-violet-500",
      sky:     "bg-sky-50     border-sky-100     text-sky-500",
      emerald: "bg-emerald-50 border-emerald-100 text-emerald-500",
      amber:   "bg-amber-50   border-amber-100   text-amber-500",
    }
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800 leading-none">{value}</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{label}</p>
        </div>
      </div>
    )
  }