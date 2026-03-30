"use client"

import { ExternalLink, FileText, Calendar } from "lucide-react"


import { Submission } from "../../../types/StudentSubmissions"
import { GradeForm } from "./GradeForm"
import { GradeBadge } from "../../ui/molecules/GradeBadge"
import { StateBadge } from "../../ui/atoms/SubmissionStatus"
import { formatDate } from "@/src/app/_utils/FormatDate"

interface SubmissionRowProps {
  submission: Submission
  onGrade: (workId: string, studentId: string, grade: number) => Promise<void>
}

export function SubmissionRow({ submission, onGrade }: SubmissionRowProps) {
  const hasFile = !!submission.file_url

  return (
    <div className="rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-150 overflow-hidden">
      {/* work header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{submission.work.nome}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Valor máx.: {submission.work.valor} pts</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <GradeBadge grade={submission.grade} max={submission.work.valor} />
          <StateBadge fileUrl={submission.file_url} grade={submission.is_graded} />
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* file + date */}
        <div className="flex items-center gap-4 min-w-0">
          {hasFile ? (
            <a
              href={submission.file_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-150"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 transition-colors" />
              <span className="text-xs font-semibold text-slate-500 group-hover:text-violet-600 transition-colors">
                Ver arquivo
              </span>
            </a>
          ) : (
            <span className="text-xs text-slate-300 font-medium italic">Nenhum arquivo enviado</span>
          )}

          {submission.submitted_at && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Calendar className="w-3 h-3" />
              {formatDate(submission.submitted_at)}
            </span>
          )}
        </div>

        {/* grade input — only if file was submitted */}
        {hasFile && (
          <GradeForm
            workId={submission.work_id}
            studentId={submission.student_id}
            maxGrade={submission.work.valor}
            currentGrade={submission.grade}
            onSubmit={onGrade}
          />
        )}
      </div>
    </div>
  )
}