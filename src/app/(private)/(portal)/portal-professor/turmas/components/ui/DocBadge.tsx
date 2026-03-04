import { FormatDate } from "@/src/app/_utils/FormatDate"
import { Calendar, ExternalLink, FileText } from "lucide-react"

export function DocBadge({ nome, descricao, url_documento, data_liberacao }: {
    nome: string
    descricao: string
    url_documento: string
    data_liberacao: Date
  }) {
    return (
      <a
        href={url_documento}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md hover:shadow-purple-50 transition-all duration-200 cursor-pointer"
      >
        <div className="shrink-0 w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
          <FileText className="w-4 h-4 text-purple-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-purple-700 transition-colors">
              {nome}
            </p>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-400 flex-shrink-0 transition-colors" />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{descricao}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Calendar className="w-3 h-3 text-slate-300" />
            <span className="text-[11px] text-slate-400">{FormatDate(String(data_liberacao))}</span>
          </div>
        </div>
      </a>
    )
  }