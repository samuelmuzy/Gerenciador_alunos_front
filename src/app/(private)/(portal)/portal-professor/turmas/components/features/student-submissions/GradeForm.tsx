"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Award } from "lucide-react"

interface GradeFormProps {
  workId: string
  studentId: string
  maxGrade: number
  currentGrade: number | null
  onSubmit: (workId: string, studentId: string, grade: number) => Promise<void>
}

export function GradeForm({ workId, studentId, maxGrade, currentGrade, onSubmit }: GradeFormProps) {
  const [value, setValue] = useState(currentGrade !== null ? String(currentGrade) : "")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0 && numericValue <= maxGrade

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    try {
      await onSubmit(workId, studentId, numericValue)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <Award className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
        <input
          type="number"
          min={0}
          max={maxGrade}
          step={0.1}
          value={value}
          onChange={(e) => { setValue(e.target.value); setSaved(false) }}
          placeholder={`0 – ${maxGrade}`}
          className={`w-28 pl-8 pr-3 py-2 text-sm font-semibold rounded-xl border outline-none transition-all duration-150
            focus:ring-2 focus:ring-violet-200
            ${!value ? "border-slate-200 bg-white text-slate-700"
              : isValid ? "border-violet-300 bg-violet-50/50 text-violet-700"
              : "border-rose-300 bg-rose-50 text-rose-600"}`}
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all duration-150 shadow-sm shadow-violet-200"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : saved ? (
          <><CheckCircle2 className="w-3.5 h-3.5" /> Salvo</>
        ) : (
          "Salvar"
        )}
      </button>
    </form>
  )
}