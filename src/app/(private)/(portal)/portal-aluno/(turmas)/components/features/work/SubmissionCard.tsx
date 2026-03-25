import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, FileText, RefreshCw } from "lucide-react"
import { UploadZone } from "./UploadZone"
import { TrabalhoDetail } from "../../../types/WorkDetail"
import { useState } from "react"
import { formatDate } from "@/src/app/_utils/FormatDate"
import { StatusBadge } from "../../ui/atoms/StateBadge"

export function SubmissaoCard({ submissao, onResubmit, loading }: {
    submissao: NonNullable<TrabalhoDetail["submissao"]>
    onResubmit: (file: File) => Promise<void>
    loading: boolean
  }) {
    const [replacing, setReplacing] = useState(false)
  
    return (
      <div className="space-y-4">
        {/* existing file */}
        <a
          href={submissao.url_documento}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
            <FileText className="w-5 h-5 text-violet-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-violet-700 transition-colors">
              Trabalho enviado
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{formatDate(submissao.criado_em)}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={submissao.status} />
            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-violet-400 transition-colors" />
          </div>
        </a>
  
        {/* resubmit toggle */}
        {submissao.status !== "aprovado" && (
          <>
            <button
              onClick={() => setReplacing(!replacing)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-violet-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {replacing ? "Cancelar reenvio" : "Reenviar trabalho"}
            </button>
  
            <AnimatePresence>
              {replacing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <UploadZone onSubmit={async (f) => { await onResubmit(f); setReplacing(false) }} loading={loading} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    )
  }