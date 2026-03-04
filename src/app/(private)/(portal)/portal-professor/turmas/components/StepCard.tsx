"use client"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar, BookOpen,
  ClipboardList, ChevronDown, Plus, Award, Hash
} from "lucide-react"
import CreateWorkModal from "./modals/CreateWorkModal"
import CreateContentModal from "./modals/CreateContentModal"
import { StepAndClass, StepAndContent } from "@/src/types/Class-student"
import { FormatDate } from "@/src/app/_utils/FormatDate"
import { ApiError } from "@/src/errors/api-error"
import { handleResponse } from "@/src/services/handle-response"
import { EmptyState } from "./ui/EmptyState"
import { DocBadge } from "./ui/DocBadge"
import { ScoreBadge } from "./ui/ScoreBadge"
import { WorkFormSchema } from "@/src/app/schemas/create-work-schema"
import { Work } from "@/src/types/Work"
import { Content } from "@/src/types/Content"

interface StepCardProps {
  step: StepAndContent["step"]; // ou o tipo correto do `step`
  setSteps: React.Dispatch<React.SetStateAction<StepAndClass[] | null>>;
}



export function StepCard({ step, setSteps }: StepCardProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"conteudos" | "provas" | "trabalhos">("conteudos")
  const [isModalWorkOpen, setIsModalWorkOpen] = useState(false)
  const [isModalContentOpen, setIsModalContentOpen] = useState(false)

  const onSubmit = async (data: WorkFormSchema) => {
    try {

      const response = await fetch('/api/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.description,
          tipo: 'work',
          valor: Number(data.value),
          data_inicio: new Date(data.startDate),
          data_fim: new Date(data.endDate),
          id_etapa: step.id,
        })
      });

      const createdWork = await handleResponse<Work>(response)

      setSteps((prev) =>
        prev
          ? prev.map((s) =>
            s.id === step.id
              ? { ...s, trabalhos: [...s.trabalhos, createdWork] }
              : s
          )
          : prev
      );

      setIsModalWorkOpen(false)
    } catch (error) {
      if (error instanceof ApiError) console.error(error.message)
      else console.error("Erro inesperado.")
    }
  }

  const handleCreateContent = async (data: {
    nome: string
    descricao: string
    file: File
  }) => {
    try {
      const formData = new FormData()
      formData.append("nome", data.nome)
      formData.append("descricao", data.descricao)
      formData.append("id_etapa", String(step.id))
      formData.append("file", data.file)
      formData.append("data_liberacao", new Date(step.data_inicio).toISOString())

      const response = await fetch(`/api/content`, { method: "POST", body: formData })

      const createdContent = await handleResponse<Content>(response)

      setSteps((prev) => {
        if (!prev) return prev;
        return prev.map((s) =>
          s.id === step.id
            ? { ...s, conteudos: [...s.conteudos, createdContent] }
            : s
        )
      }
      );

      setIsModalContentOpen(false)
    } catch (error) {
      if (error instanceof ApiError) console.error(error.message)
      else console.error("Erro inesperado.")
    }
  }

  const tabs = [
    { key: "conteudos" as const, label: "Conteúdos", icon: BookOpen, count: step.conteudos.length },
    { key: "provas" as const, label: "Provas", icon: Hash, count: step.provas.length },
    { key: "trabalhos" as const, label: "Trabalhos", icon: ClipboardList, count: step.trabalhos.length },
  ]

  return (
    <>
      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300" />

        <CardContent className="p-0">
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4.5 h-4.5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 leading-tight">
                  {step.nome}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {FormatDate(String(step.data_inicio))} — {FormatDate(String(step.data_fim))}
                  <span className="mx-1 text-slate-200">·</span>
                  <Award className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-500 font-medium">{step.nota_maxima_etapa} pts</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-sm font-medium text-slate-500 hover:text-purple-600 transition-all duration-150"
            >
              {open ? "Ocultar" : "Gerenciar"}
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>
          </div>

          {/* Expandable */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Divider */}
                <div className="mx-6 h-px bg-slate-100" />

                {/* Tabs */}
                <div className="px-6 pt-4 flex items-center gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${activeTab === tab.key
                        ? "bg-purple-600 text-white shadow-sm shadow-purple-200"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                      <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="px-6 pt-3 pb-6">
                  <AnimatePresence mode="wait">

                    {/* CONTEÚDOS */}
                    {activeTab === "conteudos" && (
                      <motion.div
                        key="conteudos"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2"
                      >
                        {step.conteudos.length === 0
                          ? <EmptyState label="Nenhum conteúdo publicado ainda" />
                          : step.conteudos.map((c) => (
                            <DocBadge key={c.id} {...c} />
                          ))
                        }
                        <button
                          onClick={() => setIsModalContentOpen(true)}
                          className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-xs font-semibold text-purple-500 hover:text-purple-700 transition-all duration-150"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Lançar Conteúdo
                        </button>
                      </motion.div>
                    )}

                    {/* PROVAS */}
                    {activeTab === "provas" && (
                      <motion.div
                        key="provas"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2"
                      >
                        {step.provas.length === 0
                          ? <EmptyState label="Nenhuma prova cadastrada" />
                          : step.provas.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-150"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
                                  <Hash className="w-3.5 h-3.5 text-rose-400" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{p.nome}</span>
                              </div>
                              <ScoreBadge value={p.valor} />
                            </div>
                          ))
                        }
                      </motion.div>
                    )}

                    {/* TRABALHOS */}
                    {activeTab === "trabalhos" && (
                      <motion.div
                        key="trabalhos"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2"
                      >
                        {step.trabalhos.length === 0
                          ? <EmptyState label="Nenhum trabalho cadastrado" />
                          : step.trabalhos.map((t) => (
                            <div
                              key={t.id}
                              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-150"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                                  <ClipboardList className="w-3.5 h-3.5 text-sky-400" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{t.nome}</span>
                              </div>
                              <ScoreBadge value={t.valor} />
                            </div>
                          ))
                        }
                        <button
                          onClick={() => setIsModalWorkOpen(true)}
                          className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-sky-200 hover:border-sky-400 hover:bg-sky-50 text-xs font-semibold text-sky-500 hover:text-sky-700 transition-all duration-150"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Lançar Trabalho
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <CreateWorkModal
        isOpen={isModalWorkOpen}
        onClose={() => setIsModalWorkOpen(false)}
        onSubmit={onSubmit}
      />
      <CreateContentModal
        isOpen={isModalContentOpen}
        onClose={() => setIsModalContentOpen(false)}
        onSubmit={handleCreateContent}
      />
    </>
  )
}