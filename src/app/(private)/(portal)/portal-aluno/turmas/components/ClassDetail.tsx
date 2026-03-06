"use client"

import { useMemo } from "react"
import { GraduationCap, BookOpen, ClipboardList, FileText, Calendar } from "lucide-react"
import { motion } from "framer-motion"

import StatCard from "./ui/StatCard";
import { ClassDetailData } from "@/src/types/Class-detail";
import { Tag } from "./ui/Tag";
import { formatDate, FormatDate } from "@/src/app/_utils/FormatDate";
import { EtapaSection } from "./StepSection";

interface ClassDetailPageProps {
  data: ClassDetailData
}

export function ClassDetailPage({ data }: ClassDetailPageProps) {
  const stats = useMemo(() => ({
    etapas:    data.periodo.etapas.length,
    conteudos: data.periodo.etapas.reduce((acc, e) => acc + e.conteudos.length, 0),
    trabalhos: data.periodo.etapas.reduce((acc, e) => acc + e.trabalhos.length, 0),
  }), [data.periodo.etapas])

  const dateRange = useMemo(() => {
    if (!data.periodo.etapas.length) return null
    const sorted = [...data.periodo.etapas].sort(
      (a, b) => new Date(a.data_inicio).getTime() - new Date(b.data_inicio).getTime()
    )
    return {
      inicio: sorted[0].data_inicio,
      fim: sorted[sorted.length - 1].data_fim,
    }
  }, [data.periodo.etapas])

  return (
    <div className="min-h-screen bg-[#f7f8fb]">

      {/* ── Hero header ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-200 flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Tag color="purple">{data.periodo.nome}</Tag>
                </div>
                <h1
                  className="text-2xl font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: "'Lora', Georgia, serif", letterSpacing: "-0.02em" }}
                >
                  {data.nome}
                </h1>
                {dateRange && (
                  <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(dateRange.inicio)} — {formatDate(dateRange.fim)}
                  </p>
                )}
              </div>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <StatCard icon={BookOpen}      label="Etapas"    value={stats.etapas}    color="purple" />
              <StatCard icon={FileText}      label="Conteúdos" value={stats.conteudos} color="sky"    />
              <StatCard icon={ClipboardList} label="Trabalhos" value={stats.trabalhos} color="amber"  />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {data.periodo.etapas.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-slate-500 font-semibold">Nenhuma etapa encontrada</p>
            <p className="text-sm text-slate-400">As etapas aparecerão aqui quando forem cadastradas.</p>
          </div>
        ) : (
          data.periodo.etapas.map((etapa, i) => (
            <EtapaSection key={etapa.id} etapa={etapa} index={i} />
          ))
        )}
      </div>
    </div>
  )
}