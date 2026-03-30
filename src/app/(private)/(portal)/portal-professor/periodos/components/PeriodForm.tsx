'use client'

import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreatePeriodusRegularSchema } from "@/src/app/schemas/create-periodus-schema"
import { FormField } from './FormField'
import { StepFields } from './StepField'


interface PeriodFormProps {
  form: UseFormReturn<CreatePeriodusRegularSchema>
  isSubmitting: boolean
  error: string | null
  hasPeriods: boolean
  onSubmit: (data: CreatePeriodusRegularSchema) => Promise<void>
  onCancel: () => void
}

export function PeriodForm({
  form,
  isSubmitting,
  error,
  hasPeriods,
  onSubmit,
  onCancel,
}: PeriodFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = form

  const stepCount = watch('quantidade_etapas') ?? 1
  const hasMultipleSteps = stepCount > 1

  useEffect(() => {
    if (!hasMultipleSteps || !Number.isInteger(stepCount) || stepCount < 2) return

    const current = getValues('etapas')
    const prev = Array.isArray(current) ? current : []

    setValue(
      'etapas',
      Array.from({ length: stepCount }, (_, i) => ({
        id_periodo: '',
        nota_maxima_etapa: prev[i]?.nota_maxima_etapa ?? 0,
        data_inicio: prev[i]?.data_inicio ?? '',
        data_fim: prev[i]?.data_fim ?? '',
      }))
    )
    
  }, [stepCount, hasMultipleSteps, setValue, getValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6" noValidate>
      {!hasPeriods && (
        <p className="mb-4 text-slate-600">Nenhum período cadastrado ainda. Crie o primeiro período acadêmico abaixo.</p>
      )}

      <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm font-medium text-slate-700">Detalhes do período acadêmico</p>

        <FormField label="Nome do período" htmlFor="period-name" error={errors.nome?.message}>
          <input
            id="period-name"
            type="text"
            {...register('nome')}
            placeholder="ex: 2025/1"
            className="input"
          />
        </FormField>

        <FormField label="Descrição" htmlFor="period-description" error={errors.descricao?.message}>
          <input
            id="period-description"
            type="text"
            {...register('descricao')}
            placeholder="ex: Primeiro semestre de 2025"
            className="input"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Data de início" htmlFor="start-date" error={errors.data_inicio?.message}>
            <input id="start-date" type="date" {...register('data_inicio')} className="input" />
          </FormField>
          <FormField label="Data de término" htmlFor="end-date" error={errors.data_fim?.message}>
            <input id="end-date" type="date" {...register('data_fim')} className="input" />
          </FormField>
        </div>

        <FormField label="Número de etapas" htmlFor="step-count" error={errors.quantidade_etapas?.message}>
          <input
            id="step-count"
            type="number"
            min={1}
            max={20}
            {...register('quantidade_etapas', { valueAsNumber: true })}
            className="input"
          />
        </FormField>

        {!hasMultipleSteps && (
          <FormField label="Nota máxima" htmlFor="max-grade" error={errors.nota_maxima?.message}>
            <input
              id="max-grade"
              type="number"
              min={1}
              max={100}
              {...register('nota_maxima', { valueAsNumber: true })}
              className="input"
            />
          </FormField>
        )}

        {hasMultipleSteps && (
          <StepFields stepCount={stepCount} register={register} />
        )}

        <FormField label="Nota de corte" htmlFor="passing-grade" error={errors.nota_corte?.message}>
          <input
            id="passing-grade"
            type="number"
            min={0}
            max={100}
            step={0.1}
            {...register('nota_corte', { valueAsNumber: true })}
            className="input"
          />
        </FormField>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar período'}
        </button>

        {hasPeriods && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}