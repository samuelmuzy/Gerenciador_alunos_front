"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, Mail, Hash, BookOpen, ClipboardList, CheckCircle2, Clock } from "lucide-react"
import { StepGroup, StudentInfo, Submission } from "../../../types/StudentSubmissions"
import { StatCard } from "../../ui/StartCard"
import { StepGroupCard } from "../../ui/StepGroupCard"
import { ApiError } from "@/src/errors/api-error"
import { handleResponse } from "@/src/services/handle-response"


interface StudentSubmissionsPageProps {
    studentId: string
    studentClassId: string
    onBack?: () => void
}

export function StudentSubmissionsClient({
    studentId,
    studentClassId,
    onBack
}: StudentSubmissionsPageProps) {

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [student, setStudent] = useState<StudentInfo | null>(null)

    const fetchSubmissions = async () => {
        try {
            const res = await fetch(`/api/work/student-class/${studentClassId}/student/${studentId}/submissoes`)

            const data = await handleResponse<Submission[]>(res);
            console.log(data)

            setSubmissions(data);
            setStudent(data[0].student)

        } catch (error) {
            if (error instanceof ApiError) {
                console.error(error.message);
            } else {
                console.error("Erro inesperado.");
            }
        }
    }

    useEffect(() =>{
        fetchSubmissions();
    },[studentId]);

    const onGrade = async (workId: string, studentId: string, grade: number) => {

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissoes/nota`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ work_id: workId, student_id: studentId, grade }),
        })
    }


    // group submissions by step
    const stepGroups = useMemo<StepGroup[]>(() => {
        const map = new Map<string, StepGroup>()
        for (const sub of submissions) {
            const key = sub.step.id
            if (!map.has(key)) map.set(key, { step: sub.step, submissions: [] })
            map.get(key)!.submissions.push(sub)
        }
        return Array.from(map.values())
    }, [submissions])

    // summary stats
    const stats = useMemo(() => {
        const total = submissions.length
        const submitted = submissions.filter((s) => s.file_url).length
        const graded = submissions.filter((s) => s.is_graded).length
        const totalEarned = submissions.reduce((acc, s) => acc + (s.grade ?? 0), 0)
        const totalPossible = submissions.reduce((acc, s) => acc + s.work.valor, 0)
        return { total, submitted, graded, totalEarned, totalPossible }
    }, [submissions])

    if (!student) return null

    return (
        <div className="min-h-screen bg-[#f7f8fb]">

            {/* ── sticky top bar ───────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
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
                            Submissões do Aluno
                        </p>
                        <h1
                            className="text-lg font-bold text-slate-800 truncate mt-0.5"
                            style={{ fontFamily: "'Lora', Georgia, serif" }}
                        >
                            {student.nome}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

                {/* ── student info card ─────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="h-[3px] bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400" />
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200 flex-shrink-0">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <h2
                                className="text-xl font-bold text-slate-800"
                                style={{ fontFamily: "'Lora', Georgia, serif", letterSpacing: "-0.01em" }}
                            >
                                {student.nome}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="w-3 h-3" /> {student.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Hash className="w-3 h-3" /> Matrícula {student.matricula}
                                </span>
                            </div>
                        </div>
                        {/* total score */}
                        <div className="text-right flex-shrink-0">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-800 mt-0.5">
                                {stats.totalEarned}
                                <span className="text-sm font-medium text-slate-400 ml-1">/ {stats.totalPossible}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── stats row ─────────────────────────────────────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard icon={ClipboardList} label="Trabalhos" value={stats.total} color="purple" />
                    <StatCard icon={Clock} label="Enviados" value={stats.submitted} color="sky" />
                    <StatCard icon={CheckCircle2} label="Corrigidos" value={stats.graded} color="emerald" />
                    <StatCard icon={BookOpen} label="Etapas" value={stepGroups.length} color="amber" />
                </div>

                {/* ── step groups ────────────────────────────────────────── */}
                {stepGroups.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-20 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <ClipboardList className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-semibold">Nenhuma submissão encontrada</p>
                        <p className="text-sm text-slate-400">Os trabalhos aparecerão aqui quando forem enviados.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stepGroups.map((group, i) => (
                            <StepGroupCard key={group.step.id} group={group} index={i} onGrade={onGrade} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}