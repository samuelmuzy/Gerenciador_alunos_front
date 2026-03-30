'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePeriodusRegularSchema, createPeriodusRegularSchema } from '@/src/app/schemas/create-periodus-schema'
import { Periodus } from '@/src/types/Periodus'
import { toISODateTime } from '@/src/app/_utils/Date'
import { handleResponse } from '@/src/services/handle-response'
import { ApiError } from '@/src/errors/api-error'
import { StepPeriod } from '../ui/StepPeriod'
import { StepClass } from '../ui/stepClass'
import { WizardStep } from '../ui/WizardStep'


interface ModalCreateClassProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export type WizardData = {
  periodId: string
  className: string
}

const STEPS = ['Período', 'Turma']

export function ModalCreateClass({ isOpen, onClose, onSuccess }: ModalCreateClassProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const periodForm = useForm<CreatePeriodusRegularSchema>({
    resolver: zodResolver(createPeriodusRegularSchema),
    defaultValues: { quantidade_etapas: 1, nota_maxima: 0 },
  })

  function handleClose() {
    setCurrentStep(0)
    setWizardData({})
    setError(null)
    periodForm.reset()
    onClose()
  }

  // ─── Step 1: período selecionado ou criado ────────────────────────────────
  async function handlePeriodSelected(periodId: string) {
    setWizardData((prev) => ({ ...prev, periodId }))
    setCurrentStep(1)
  }

  async function handlePeriodCreated(data: CreatePeriodusRegularSchema) {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/periodos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          descricao: data.descricao,
          data_inicio: data.data_inicio,
          data_fim: data.data_fim,
          nota_corte: data.nota_corte,
        }),
      })
      const period = await handleResponse<Periodus>(res)
      if (!period) throw new Error('Período inválido')

      const stepCount = data.quantidade_etapas ?? 1
      const steps =
        stepCount < 2
          ? [{ id_periodo: period.id, nome: 'Etapa 1', nota_maxima_etapa: data.nota_maxima ?? 100, data_inicio: toISODateTime(data.data_inicio), data_fim: toISODateTime(data.data_fim) }]
          : data.etapas!.map((s, i) => ({ id_periodo: period.id, nome: `Etapa ${i + 1}`, nota_maxima_etapa: s.nota_maxima_etapa, data_inicio: toISODateTime(s.data_inicio), data_fim: toISODateTime(s.data_fim) }))

      await fetch('/api/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(steps),
        credentials: 'include',
      })

      periodForm.reset()
      await handlePeriodSelected(period.id)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao criar período.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Step 2: criar turma ─────────────────────────────────────────────────
  async function handleClassSubmit(className: string) {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/student-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nome: className, id_periodo: wizardData.periodId }),
      })
      await handleResponse(res)
      onSuccess()
      handleClose()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao criar turma.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Nova Turma</h2>
            <p className="mt-0.5 text-sm text-slate-500">Siga os passos para criar a turma.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 border-b border-slate-100 px-6 py-4">
          {STEPS.map((label, idx) => (
            <WizardStep
              key={label}
              index={idx}
              label={label}
              total={STEPS.length}
              current={currentStep}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          {currentStep === 0 && (
            <StepPeriod
              form={periodForm}
              isSubmitting={isSubmitting}
              error={error}
              onSelectExisting={handlePeriodSelected}
              onCreateNew={handlePeriodCreated}
            />
          )}
          {currentStep === 1 && (
            <StepClass
              isSubmitting={isSubmitting}
              error={error}
              onBack={() => setCurrentStep(0)}
              onSubmit={handleClassSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}