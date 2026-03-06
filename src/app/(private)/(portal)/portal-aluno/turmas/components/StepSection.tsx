"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, BookOpen, ClipboardList, Calendar, Award } from "lucide-react"

import { Etapa } from "@/src/types/Class-detail"
import { FormatDate } from "@/src/app/_utils/FormatDate"
import { Tag } from "./ui/Tag"
import { SectionTitle } from "./ui/SectionTitle"
import { TrabalhoRow } from "./ui/WorkRow"
import { EmptyState } from "./ui/EmptyState"
import { ConteudoCard } from "./ui/ContentCard"

interface EtapaSectionProps {
  etapa: Etapa
  index: number
}

export function EtapaSection({ etapa, index }: EtapaSectionProps) {
  const [open, setOpen] = useState(index === 0)

  const totalConteudos = etapa.conteudos.length
  const totalTrabalhos = etapa.trabalhos.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden"
    >
      {/* colored top stripe */}
      <div className="h-[3px] w-full bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300" />

      {/* header row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-violet-500" />
          </div>

          <div>
            <p className="text-base font-bold text-slate-800 leading-tight">{etapa.nome}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar className="w-3 h-3" />
                {FormatDate(etapa.data_inicio)} — {FormatDate(etapa.data_fim)}
              </span>
              <Tag color="amber">
                <Award className="w-3 h-3" />
                {etapa.nota_maxima_etapa} pts máx.
              </Tag>
              <Tag color="purple">
                <BookOpen className="w-3 h-3" />
                {totalConteudos} conteúdo{totalConteudos !== 1 ? "s" : ""}
              </Tag>
              <Tag color="sky">
                <ClipboardList className="w-3 h-3" />
                {totalTrabalhos} trabalho{totalTrabalhos !== 1 ? "s" : ""}
              </Tag>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      {/* expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mx-6 h-px bg-slate-100" />

            <div className="px-6 py-5 grid grid-cols-1 lg:grid-cols-1 gap-6">

              {/* Conteúdos */}
              <div>
                <SectionTitle>Conteúdos</SectionTitle>
                {totalConteudos === 0
                  ? <EmptyState icon={BookOpen} label="Nenhum conteúdo disponível" />
                  : (
                    <div className="space-y-2">
                      {etapa.conteudos.map((c) => (
                        <ConteudoCard key={c.id} conteudo={c} />
                      ))}
                    </div>
                  )}
              </div>

              {/* Trabalhos */}
              <div>
                <SectionTitle>Trabalhos / Avaliações</SectionTitle>
                {totalTrabalhos === 0
                  ? <EmptyState icon={ClipboardList} label="Nenhum trabalho cadastrado" />
                  : (
                    <div className="space-y-2">
                      {etapa.trabalhos.map((t) => (
                        <TrabalhoRow key={t.id} trabalho={t} />
                      ))}
                    </div>
                  )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}