"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ClipboardList, Award, Calendar, Clock,
    CheckCircle2, ArrowLeft,
    AlertCircle, XCircle
} from "lucide-react"
import { TrabalhoDetail } from "../../../types/WorkDetail"
import { isLate } from "@/src/app/_utils/isLate"
import { InfoRow } from "../../ui/atoms/InfoRow"
import { formatDate } from "@/src/app/_utils/FormatDate"
import { SubmissaoCard } from "./SubmissionCard"
import { UploadZone } from "./UploadZone"
import { StatusBadge } from "../../ui/atoms/StateBadge"
import { handleResponse } from "@/src/services/handle-response"
import { ApiError } from "@/src/errors/api-error"



interface TrabalhoDetailPageProps {
    onBack?: () => void
    workId: string
}



export function WorkDetail({ onBack, workId }: TrabalhoDetailPageProps) {
    const [success, setSuccess] = useState(false)
    const [trabalho, setTrabalho] = useState<TrabalhoDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchWork = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/work/${workId}`)
            console.log(res)
            const works = await handleResponse<TrabalhoDetail>(res)
            console.log(works)
            setTrabalho(works)
        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message)
            } else {
                setError("Não foi possível carregar o trabalho.")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (file: File) => {
        try {
            setSubmitting(true)
            setSubmitError(null)
            setSuccess(false)

            const formData = new FormData()
            formData.append("file", file)
            formData.append("trabalho_id", workId)
            formData.append("data_envio", new Date().toISOString())
            formData.append("nota", "0")

            const res = await fetch("/api/work/student", {
                method: "POST",
                body: formData,
            })

            await handleResponse(res)
            setSuccess(true)
            await fetchWork()
        } catch (e) {
            if (e instanceof ApiError) {
                setSubmitError(e.message)
            } else {
                setSubmitError("Não foi possível enviar o trabalho.")
            }
        } finally {
            setSubmitting(false)
        }
    }



    useEffect(() => {
        fetchWork();
    }, [workId])

    if (loading) return (
        <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-3xl px-6">
                <div className="h-10 bg-slate-200 rounded-xl w-1/2" />
                <div className="h-40 bg-slate-200 rounded-2xl" />
                <div className="h-32 bg-slate-200 rounded-2xl" />
            </div>
        </div>
    )

    if (error) return (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-50 border border-rose-200">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <p className="text-sm font-semibold text-rose-600">{error}</p>
        </div>
    )
    
    if (!trabalho) return null

    const late = isLate(trabalho.data_entrega ?? trabalho.data_fim)
    const jaSubmeteu = trabalho.ja_submeteu ?? Boolean(trabalho.submissao)
    const mensagemSubmissao = trabalho.mensagem_submissao ?? (jaSubmeteu ? "Trabalho enviado" : "Trabalho ainda não enviado")

    return (
        <div className="min-h-screen bg-[#f7f8fb]">

            {/* ── top bar ───────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all flex-shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 text-slate-500" />
                        </button>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                            {trabalho.etapa.nome}
                        </p>
                        <h1
                            className="text-lg font-bold text-slate-800 truncate mt-0.5"
                            style={{ fontFamily: "'Lora', Georgia, serif" }}
                        >
                            {trabalho.nome}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {trabalho.submissao && <StatusBadge status={trabalho.submissao.status} />}
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold">
                            <Award className="w-3 h-3" />
                            {trabalho.valor} pts
                        </span>
                    </div>
                </div>
            </div>

            {/* ── body ─────────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">

                {submitError && (
                    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-50 border border-rose-200">
                        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                        <p className="text-sm font-semibold text-rose-600">{submitError}</p>
                    </div>
                )}

                {jaSubmeteu && (
                    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm font-semibold text-emerald-700">{mensagemSubmissao}</p>
                    </div>
                )}

                {/* success toast */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200"
                        >
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <p className="text-sm font-semibold text-emerald-700">Trabalho enviado com sucesso!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* deadline warning */}
                {late && (
                    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-50 border border-rose-200">
                        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                        <p className="text-sm font-semibold text-rose-600">Prazo de entrega encerrado.</p>
                    </div>
                )}

                {/* info card */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                    <div className="h-[3px] bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-300" />
                    <div className="p-6 space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                                <ClipboardList className="w-5 h-5 text-violet-500" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Trabalho</p>
                                <h2
                                    className="text-xl font-bold text-slate-800"
                                    style={{ fontFamily: "'Lora', Georgia, serif", letterSpacing: "-0.01em" }}
                                >
                                    {trabalho.nome}
                                </h2>
                            </div>
                        </div>

                        {trabalho.descricao && (
                            <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-violet-200 pl-4">
                                {trabalho.descricao}
                            </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                            <InfoRow icon={Award} label="Valor" value={`${trabalho.valor} pontos`} />
                            <InfoRow icon={Calendar} label="Etapa" value={trabalho.etapa.nome} />
                            <InfoRow
                                icon={Clock}
                                label="Prazo"
                                value={formatDate(trabalho.data_entrega ?? trabalho.etapa.data_fim)}
                                highlight={late}
                            />
                        </div>
                    </div>
                </div>

                {/* submission card */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                    <div className="h-[3px] bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400" />
                    <div className="p-6 space-y-4">
                        <div>
                            <h3 className="text-base font-bold text-slate-800">Envio do Trabalho</h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {jaSubmeteu
                                    ? "Você já enviou uma submissão. Visualize ou reenvie abaixo."
                                    : "Envie seu arquivo em PDF, PNG ou JPG (máx. 5 MB)."}
                            </p>
                        </div>

                        {trabalho.submissao ? (
                            <SubmissaoCard
                                submissao={trabalho.submissao}
                                onResubmit={handleSubmit}
                                loading={submitting}
                            />
                        ) : late ? (
                            <div className="flex flex-col items-center gap-2 py-8 rounded-2xl border border-dashed border-rose-200 bg-rose-50/40">
                                <XCircle className="w-6 h-6 text-rose-300" />
                                <p className="text-sm font-semibold text-rose-400">Envio encerrado</p>
                            </div>
                        ) : (
                            <UploadZone onSubmit={handleSubmit} loading={submitting} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}