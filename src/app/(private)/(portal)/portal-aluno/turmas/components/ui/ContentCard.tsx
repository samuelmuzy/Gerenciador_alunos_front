import { formatDate, FormatDate } from "@/src/app/_utils/FormatDate";
import { Conteudo } from "@/src/types/Class-detail";
import { Calendar, ExternalLink, FileText } from "lucide-react";

export function ConteudoCard({ conteudo }: { conteudo: Conteudo }) {
    return (
      <a
        href={conteudo.url_documento}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-100
                   hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50/60
                   transition-all duration-200 cursor-pointer"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 border border-purple-100
                        flex items-center justify-center group-hover:bg-purple-100 transition-colors">
          <FileText className="w-4.5 h-4.5 text-purple-500" />
        </div>
  
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-purple-700 transition-colors leading-snug">
              {conteudo.nome}
            </p>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-400 flex-shrink-0 mt-0.5 transition-colors" />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{conteudo.descricao}</p>
          <div className="flex items-center gap-1 mt-2">
            <Calendar className="w-3 h-3 text-slate-300" />
            <span className="text-[11px] text-slate-400">{formatDate(conteudo.data_liberacao)}</span>
          </div>
        </div>
      </a>
    )
  }
  