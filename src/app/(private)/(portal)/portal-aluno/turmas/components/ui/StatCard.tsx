export default function StatCard({ icon: Icon, label, value, color }: {
    icon: React.ElementType
    label: string
    value: number
    color: "purple" | "sky" | "amber"
  }) {
    const colors = {
      purple: "bg-purple-50 border-purple-100 text-purple-500",
      sky:    "bg-sky-50    border-sky-100    text-sky-500",
      amber:  "bg-amber-50  border-amber-100  text-amber-500",
    }
  
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-xl font-bold text-slate-800 leading-none">{value}</p>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">{label}</p>
        </div>
      </div>
    )
  }