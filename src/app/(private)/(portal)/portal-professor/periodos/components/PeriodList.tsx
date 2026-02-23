import { Periodus } from "@/src/types/Periodus"

interface PeriodListProps {
  periods: Periodus[]
}

export function PeriodList({ periods }: PeriodListProps) {
  return (
    <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-medium text-slate-900">Registered periods</h2>
      <ul className="mt-3 space-y-2">
        {periods.map((period) => (
          <li
            key={period.id}
            className="flex items-center justify-between rounded border border-slate-100 bg-slate-50/50 px-3 py-2 text-slate-700"
          >
            <span className="font-medium">{period.nome}</span>
            <span className="text-sm text-slate-500">{period.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}