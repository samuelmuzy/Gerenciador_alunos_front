import { Trabalho } from "@/src/types/Class-detail";
import { Award, ClipboardList, Tag } from "lucide-react";
import Link from "next/link";

interface TrabalhoRowProps {
    trabalho: Trabalho;
    href: string;
}

export function TrabalhoRow({ trabalho, href }: TrabalhoRowProps) {
    return (
        <Link href={href} className="flex items-center justify-between rounded-xl border border-violet-100/90 bg-white px-4 py-3 shadow-sm transition-all hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/30">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-fuchsia-100 bg-fuchsia-50/70">
                    <ClipboardList className="h-3.5 w-3.5 text-fuchsia-600" />
                </div>
                <span className="text-sm font-semibold text-slate-800">{trabalho.nome}</span>
            </div>
            <Tag color="violetMuted">
                <Award className="h-3 w-3" />
                {trabalho.valor} pts
            </Tag>
        </Link>
    )
}