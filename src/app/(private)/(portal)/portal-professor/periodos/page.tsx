'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { CreatePeriodusRegularSchema, createPeriodusRegularSchema } from "@/src/app/schemas/create-periodus-schema"
import { Periodus } from "@/src/types/Periodus"

import { PeriodList } from './components/PeriodList'
import { PeriodForm } from './components/PeriodForm'
import { toISODateTime } from '@/src/app/_utils/Date'
import { handleResponse } from '@/src/services/handle-response'
import { ApiError } from '@/src/errors/api-error'

export default function PeriodsPage() {
  const [periods, setPeriods] = useState<Periodus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CreatePeriodusRegularSchema>({
    resolver: zodResolver(createPeriodusRegularSchema),
    defaultValues: { quantidade_etapas: 1, nota_maxima: 0 },
  })

  const { reset } = form

  const fetchPeriods = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/periodos')

      const data = await handleResponse(res);

      setPeriods(Array.isArray(data) ? data : [])
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setPeriods([])
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPeriods()
  }, [fetchPeriods])

  const createPeriod = async (data: CreatePeriodusRegularSchema) => {

    const res = await fetch('/api/periodos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: data.nome,
        descricao: data.descricao,
        data_inicio: data.data_inicio,
        data_fim: data.data_fim,
        nota_corte: data.nota_corte,
      })
    })

    const result = await handleResponse<Periodus>(res);

    return result;
  }

  const createSteps = async (data: CreatePeriodusRegularSchema) => {
    const res = await fetch('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.etapas),
      credentials: 'include',
    })

    const result = await handleResponse(res)

    return result;
  }

  const onSubmit = async (data: CreatePeriodusRegularSchema) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const period = await createPeriod(data);

      if (!period) {
        throw new Error("Período inválido")
      }

      const stepCount = data.quantidade_etapas ?? 1

      const steps =
        stepCount < 2
          ? [{
            id_periodo: period.id,
            nome: 'Etapa 1',
            nota_maxima_etapa: data.nota_maxima ?? 100,
            data_inicio: toISODateTime(data.data_inicio),
            data_fim: toISODateTime(data.data_fim),
          }]
          : data.etapas!.map((step, index) => ({
            id_periodo: period.id,
            nome: `Etapa ${index + 1}`,
            nota_maxima_etapa: step.nota_maxima_etapa,
            data_inicio: toISODateTime(step.data_inicio),
            data_fim: toISODateTime(step.data_fim),
          }))

      await createSteps({ ...data, etapas: steps })
      reset()
      setShowForm(false)
      await fetchPeriods()
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Erro inesperado.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setError(null)
    reset()
  }

  const shouldShowForm = periods.length === 0 || showForm

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Períodos Acadêmicos</h1>
        <p className="mt-2 text-slate-600">Gerencie seus períodos acadêmicos e suas etapas.</p>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {!shouldShowForm && (
            <div className="mt-6 space-y-4">
              <p className="text-slate-600">{periods.length} período(s) cadastrados.</p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                + Criar período acadêmico
              </button>
            </div>
          )}

          {shouldShowForm && (
            <PeriodForm
              form={form}
              isSubmitting={isSubmitting}
              error={error}
              hasPeriods={periods.length > 0}
              onSubmit={onSubmit}
              onCancel={handleCancel}
            />
          )}

          {!isLoading && periods.length > 0 && !showForm && (
            <PeriodList periods={periods} onDeleted={fetchPeriods} />
          )}
        </>
      )}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="mt-8 flex items-center gap-2 text-slate-500">
      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <span className="text-sm">Carregando períodos...</span>
    </div>
  )
}