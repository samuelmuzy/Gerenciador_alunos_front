import { formatDate } from "@/src/app/_utils/FormatDate";
import { Conteudo } from "@/src/types/Class-detail";
import { Calendar, ExternalLink, FileText } from "lucide-react";

export function ConteudoCard({ conteudo }: { conteudo: Conteudo }) {
    return (
      <a
        href={conteudo.url_documento}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex cursor-pointer items-start gap-3.5 rounded-2xl border border-violet-100/90 bg-white p-4 shadow-sm shadow-transparent transition-all duration-200 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/40"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 transition-colors group-hover:bg-violet-100/80">
          <FileText className="h-4.5 w-4.5 text-violet-600" />
        </div>
  
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-violet-800">
              {conteudo.nome}
            </p>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-violet-500" />
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{conteudo.descricao}</p>
          <div className="mt-2 flex items-center gap-1">
            <Calendar className="h-3 w-3 text-violet-300" />
            <span className="text-[11px] text-slate-500">{formatDate(conteudo.data_liberacao)}</span>
          </div>
        </div>
      </a>
    )
  }
  