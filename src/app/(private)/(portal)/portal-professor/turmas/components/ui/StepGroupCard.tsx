import { BookOpen } from "lucide-react"
import { StepGroup } from "../../types/StudentSubmissions"
import { motion } from "framer-motion"
import { SubmissionRow } from "../features/student-submissions/SubmissionRow"

interface StepGroupCardProps {
    group: StepGroup
    index: number
    onGrade: (workId: string, studentId: string, grade: number) => Promise<void>
  }
   
  export function StepGroupCard({ group, index, onGrade }: StepGroupCardProps) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.28 }}
        className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="h-[3px] bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-300" />
   
        <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Etapa</p>
            <p className="text-sm font-bold text-slate-800">{group.step.nome}</p>
          </div>
          <span className="ml-auto text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {group.submissions.length} trabalho{group.submissions.length !== 1 ? "s" : ""}
          </span>
        </div>
   
        <div className="px-6 py-4 space-y-3">
          {group.submissions.map((sub) => (
            <SubmissionRow key={sub.work_id} submission={sub} onGrade={onGrade} />
          ))}
        </div>
      </motion.div>
    )
  }