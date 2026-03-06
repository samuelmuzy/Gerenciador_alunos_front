import { Trabalho } from "@/src/types/Class-detail";
import { Award, ClipboardList, Tag } from "lucide-react";

export function TrabalhoRow({ trabalho }: { trabalho: Trabalho }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <ClipboardList className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{trabalho.nome}</span>
            </div>
            <Tag color="amber">
                <Award className="w-3 h-3" />
                {trabalho.valor} pts
            </Tag>
        </div>
    )
}