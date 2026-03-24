export default function StatCard({ icon: Icon, label, value, color }: {
    icon: React.ElementType
    label: string
    value: number
    color: "purple" | "violet" | "fuchsia"
  }) {
    const colors = {
      purple:  "bg-violet-50 border-violet-100 text-violet-600",
      violet:  "bg-purple-50 border-purple-100 text-purple-600",
      fuchsia: "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600",
    }

    return (
      <div className="flex items-center gap-3 rounded-2xl border border-violet-100/80 bg-white px-5 py-4 shadow-sm shadow-violet-50/30">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors[color]}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xl font-semibold leading-none text-slate-900">{value}</p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
        </div>
      </div>
    )
  }