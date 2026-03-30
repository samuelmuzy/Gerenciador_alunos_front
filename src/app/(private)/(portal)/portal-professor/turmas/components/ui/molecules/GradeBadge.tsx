export function GradeBadge({ grade, max }: { grade: number | null; max: number }) {
    if (grade === null) return <span className="text-xs text-slate-300 font-medium">sem nota</span>
    const pct = (grade / max) * 100
    const color = pct >= 60 ? "text-emerald-600" : "text-rose-500"
    return (
      <span className={`text-sm font-bold ${color}`}>
        {grade}
        <span className="text-xs font-medium text-slate-400 ml-0.5">/{max}</span>
      </span>
    )
  }