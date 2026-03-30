import { CheckCircle2, Clock, MinusCircle } from "lucide-react"

 
type SubmissionState = "graded" | "submitted" | "missing"
 
export function getSubmissionState(fileUrl: string | null, grade: boolean): SubmissionState {
  if (grade !== false) return "graded"
  if (fileUrl)        return "submitted"
  return "missing"
}
 
const stateConfig: Record<SubmissionState, { label: string; icon: React.ElementType; className: string }> = {
  graded:    { label: "Corrigido",  icon: CheckCircle2,  className: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  submitted: { label: "Enviado",    icon: Clock,         className: "text-sky-600     bg-sky-50     border-sky-200"     },
  missing:   { label: "Não enviado",icon: MinusCircle,   className: "text-slate-400   bg-slate-50   border-slate-200"  },
}

export function StateBadge({ fileUrl, grade }: { fileUrl: string | null; grade:boolean }) {
    const state  = getSubmissionState(fileUrl, grade)
    const cfg    = stateConfig[state]
    const Icon   = cfg.icon
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${cfg.className}`}>
        <Icon className="w-3 h-3" />
        {cfg.label}
      </span>
    )
  }