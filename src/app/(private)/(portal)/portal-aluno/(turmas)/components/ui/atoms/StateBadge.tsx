import { Check,  CheckCircle2,  Clock, XCircle } from "lucide-react";
import { SubmissaoStatus } from "../../../types/WorkDetail";

const statusConfig: Record<SubmissaoStatus, { label: string; color: string; icon: React.ElementType }> = {
    pendente: { label: "Pendente", color: "text-amber-600  bg-amber-50  border-amber-200", icon: Clock },
    enviado: { label: "Enviado", color: "text-sky-600    bg-sky-50    border-sky-200", icon: CheckCircle2 },
    aprovado: { label: "Aprovado", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
    reprovado: { label: "Reprovado", color: "text-rose-600   bg-rose-50   border-rose-200", icon: XCircle },
}

export function StatusBadge({ status }: { status: SubmissaoStatus }) {
    const cfg = statusConfig[status]
    const Icon = cfg.icon
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${cfg.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {cfg.label}
        </span>
    )
}