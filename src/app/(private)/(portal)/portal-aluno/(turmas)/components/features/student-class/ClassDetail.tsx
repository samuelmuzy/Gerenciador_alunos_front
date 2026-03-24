"use client"

import { useMemo } from "react"
import { GraduationCap, BookOpen, ClipboardList, FileText, Calendar } from "lucide-react"
import { motion } from "framer-motion"

import StatCard from "../../ui/molecules/StatCard";
import { ClassDetailData } from "@/src/types/Class-detail";
import { Tag } from "../../ui/atoms/Tag";
import { formatDate } from "@/src/app/_utils/FormatDate";
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
    <div className="min-h-screen bg-[#faf9fc]">

      {/* ── Hero header ───────────────────────────────────────────── */}
      <div className="border-b border-violet-100/80 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-md shadow-violet-200/80">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <Tag color="purple">{data.periodo.nome}</Tag>
                </div>
                <h1
                  className="text-2xl font-semibold leading-tight tracking-tight text-slate-900"
                  style={{ fontFamily: "'Lora', Georgia, serif", letterSpacing: "-0.02em" }}
                >
                  {data.nome}
                </h1>
                {dateRange && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-violet-400" />
                    {formatDate(dateRange.inicio)} — {formatDate(dateRange.fim)}
                  </p>
                )}
              </div>
            </div>

            {/* stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <StatCard icon={BookOpen}      label="Etapas"    value={stats.etapas}    color="purple" />
              <StatCard icon={FileText}      label="Conteúdos" value={stats.conteudos} color="violet" />
              <StatCard icon={ClipboardList} label="Trabalhos" value={stats.trabalhos} color="fuchsia" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl space-y-4 px-6 py-8">
        {data.periodo.etapas.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-violet-50/50">
              <BookOpen className="h-6 w-6 text-violet-300" />
            </div>
            <p className="font-semibold text-slate-700">Nenhuma etapa encontrada</p>
            <p className="text-sm text-slate-500">As etapas aparecerão aqui quando forem cadastradas.</p>
          </div>
        ) : (
          data.periodo.etapas.map((etapa, i) => (
            <EtapaSection idClass={data.id} key={etapa.id} etapa={etapa} index={i} />
          ))
        )}
      </div>
    </div>
  )
}