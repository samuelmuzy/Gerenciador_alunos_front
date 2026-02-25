'use client'

import { CreateClassSchema, createClassSchema } from '@/src/app/schemas/create-class-schema'
import { Periodus } from '@/src/types/Periodus'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'


type ModalCreateClassProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ModalCreateClass({ isOpen, onClose, onSuccess }: ModalCreateClassProps) {
  const [periods, setPeriods] = useState<Periodus[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPeriodos, setLoadingPeriodos] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<CreateClassSchema>({
    resolver: zodResolver(createClassSchema),
  })

  const onSubmit = async (data: CreateClassSchema) => {
    try {
      const res = await fetch('/api/student-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const response = await res.json()
      if (!res.ok) {
        throw new Error(response.message || 'Erro ao criar turma')
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar turma')
    } finally {
      setLoading(false)
    }
  }

  const fetchPeriodos = useCallback(async () => {
    if (isOpen) {
      try {
        setError(null)
        setLoadingPeriodos(true)

        const data = await fetch('/api/periodos')
        const list = await data.json()
        setPeriods(list)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar períodos')
      } finally {
        setLoadingPeriodos(false)
      }
    }
  }, [isOpen])


  useEffect(() => {
    fetchPeriodos()
  }, [fetchPeriodos])



  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="modal-titulo" className="text-lg font-semibold text-slate-900">
            Nova turma
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="turma-nome" className="mb-1 block text-sm font-medium text-slate-700">
                Nome da turma
              </label>
              <input
                id="turma-nome"
                type="text"
                {...register('nome')}
                placeholder="Ex: 1º Ano A"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="turma-periodo" className="mb-1 block text-sm font-medium text-slate-700">
                Período
              </label>
              <select
                id="turma-periodo"
                {...register('id_periodo')}
                disabled={loadingPeriodos}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100"
              >
                {loadingPeriodos ? (
                  <option value="">Carregando...</option>
                ) : periods.length === 0 ? (
                  <option value="">Nenhum período cadastrado</option>
                ) : (
                  periods.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))
                )}
              </select>
              {errors.id_periodo && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.id_periodo.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {errors.nome?.message || errors.id_periodo?.message || error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || loadingPeriodos}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar turma'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
