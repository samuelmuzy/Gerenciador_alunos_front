'use client'

import { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreatePeriodusRegularSchema } from '@/src/app/schemas/create-periodus-schema'
import { Periodus } from '@/src/types/Periodus'
import { PeriodForm } from '../../../periodos/components/PeriodForm'


interface StepPeriodProps {
  form: UseFormReturn<CreatePeriodusRegularSchema>
  isSubmitting: boolean
  error: string | null
  onSelectExisting: (periodId: string) => void
  onCreateNew: (data: CreatePeriodusRegularSchema) => Promise<void>
}

type Mode = 'choose' | 'select' | 'create'

export function StepPeriod({ form, isSubmitting, error, onSelectExisting, onCreateNew }: StepPeriodProps) {
  const [periods, setPeriods] = useState<Periodus[]>([])
  const [loadingPeriods, setLoadingPeriods] = useState(true)
  const [mode, setMode] = useState<Mode>('choose')
  const [selectedId, setSelectedId] = useState<string>('')

  const fetchPeriods = useCallback(async () => {
    try {
      setLoadingPeriods(true)
      const res = await fetch('/api/periodos')
      if (res.ok) {
        const data = await res.json()
        setPeriods(Array.isArray(data) ? data : [])
      }
    } finally {
      setLoadingPeriods(false)
    }
  }, [])

  useEffect(() => { fetchPeriods() }, [fetchPeriods])

  // Se não houver períodos, vai direto para criação
  useEffect(() => {
    if (!loadingPeriods && periods.length === 0) setMode('create')
  }, [loadingPeriods, periods.length])

  if (loadingPeriods) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  // ── Nenhum período existente: apenas criação ──────────────────────────────
  if (periods.length === 0) {
    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">Nenhum período cadastrado. Crie um para continuar.</p>
        <PeriodForm
          form={form}
          isSubmitting={isSubmitting}
          error={error}
          hasPeriods={false}
          onSubmit={onCreateNew}
          onCancel={() => {}}
        />
      </div>
    )
  }

  // ── Escolha inicial ───────────────────────────────────────────────────────
  if (mode === 'choose') {
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-600">
          Você tem <strong>{periods.length}</strong> período(s) cadastrado(s). Deseja usar um existente ou criar um novo?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('select')}
            className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-indigo-600">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-800">Usar existente</span>
            <span className="text-xs text-slate-500">Selecione um período já cadastrado</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('create')}
            className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-emerald-600">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-800">Criar novo</span>
            <span className="text-xs text-slate-500">Cadastre um novo período</span>
          </button>
        </div>
      </div>
    )
  }

  // ── Selecionar existente ─────────────────────────────────────────────────
  if (mode === 'select') {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setMode('choose')}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>

        <p className="text-sm font-medium text-slate-700">Selecione o período</p>

        <div className="space-y-2">
          {periods.map((p) => (
            <label
              key={p.id}
              className={[
                'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition-colors',
                selectedId === p.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
              ].join(' ')}
            >
              <input
                type="radio"
                name="period"
                value={p.id}
                checked={selectedId === p.id}
                onChange={() => setSelectedId(p.id)}
                className="accent-indigo-600"
              />
              <div>
                <p className="text-sm font-medium text-slate-800">{p.nome}</p>
                {p.descricao && <p className="text-xs text-slate-500">{p.descricao}</p>}
              </div>
            </label>
          ))}
        </div>

        <button
          type="button"
          disabled={!selectedId}
          onClick={() => onSelectExisting(selectedId)}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    )
  }

  // ── Criar novo ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setMode('choose')}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
        Voltar
      </button>

      <PeriodForm
        form={form}
        isSubmitting={isSubmitting}
        error={error}
        hasPeriods={true}
        onSubmit={onCreateNew}
        onCancel={() => setMode('choose')}
      />
    </div>
  )
}