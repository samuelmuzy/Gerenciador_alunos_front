import { Award } from "lucide-react";

export function ScoreBadge({ value }: { value: number }) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-semibold">
        <Award className="w-3 h-3" />
        {value} pts
      </span>
    )
  }