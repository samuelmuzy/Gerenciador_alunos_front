"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, BookOpen, ClipboardList, Calendar, Award } from "lucide-react"

import { Etapa } from "@/src/types/Class-detail"
import { FormatDate } from "@/src/app/_utils/FormatDate"
import { Tag } from "../../ui/atoms/Tag"
import { SectionTitle } from "../../ui/atoms/SectionTitle"
import { TrabalhoRow } from "../../ui/WorkRow"
import { EmptyState } from "../../ui/molecules/EmptyState"
import { ConteudoCard } from "../../ui/ContentCard"

interface EtapaSectionProps {
  etapa: Etapa
  index: number
  idClass:string
}

export function EtapaSection({ etapa, index,idClass }: EtapaSectionProps) {
  const [open, setOpen] = useState(index === 0)

  const totalConteudos = etapa.conteudos.length
  const totalTrabalhos = etapa.trabalhos.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-violet-100/90 bg-white shadow-sm shadow-violet-50/50"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

      {/* header row */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-violet-50/40"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50">
            <BookOpen className="h-4 w-4 text-violet-600" />
          </div>

          <div>
            <p className="text-base font-semibold leading-tight text-slate-900">{etapa.nome}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Calendar className="h-3 w-3 text-violet-400" />
                {FormatDate(etapa.data_inicio)} — {FormatDate(etapa.data_fim)}
              </span>
              <Tag color="violetMuted">
                <Award className="h-3 w-3" />
                {etapa.nota_maxima_etapa} pts máx.
              </Tag>
              <Tag color="purple">
                <BookOpen className="h-3 w-3" />
                {totalConteudos} conteúdo{totalConteudos !== 1 ? "s" : ""}
              </Tag>
              <Tag color="fuchsiaMuted">
                <ClipboardList className="h-3 w-3" />
                {totalTrabalhos} trabalho{totalTrabalhos !== 1 ? "s" : ""}
              </Tag>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 rounded-lg border border-transparent p-1 text-violet-400 group-hover:border-violet-100"
        >
          <ChevronDown className="h-4 w-4" />
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
            <div className="mx-6 h-px bg-violet-100/80" />

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
                        <TrabalhoRow href={`/portal-aluno/${idClass}/trabalho/${t.id}`} key={t.id} trabalho={t}  />
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