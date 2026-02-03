'use client'

import { useState, useEffect } from 'react'

export type Periodo = {
  id: string
  nome: string
  descricao: string
  nota_corte: number
}

type ModalCriarTurmaProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ModalCriarTurma({ isOpen, onClose, onSuccess }: ModalCriarTurmaProps) {
  const [nome, setNome] = useState('')
  const [idPeriodo, setIdPeriodo] = useState('')
  const [periodos, setPeriodos] = useState<Periodo[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPeriodos, setLoadingPeriodos] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setError(null)
      setNome('')
      setIdPeriodo('')
      setLoadingPeriodos(true)
      fetch('/api/periodos')
        .then((res) => res.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : []
          setPeriodos(list)
          if (list.length > 0) {
            setIdPeriodo(list[0].id)
          }
        })
        .catch(() => setPeriodos([]))
        .finally(() => setLoadingPeriodos(false))
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!nome.trim()) {
      setError('Informe o nome da turma.')
      return
    }
    if (!idPeriodo) {
      setError('Selecione um período.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), id_periodo: idPeriodo }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Erro ao criar turma')
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar turma')
    } finally {
      setLoading(false)
    }
  }

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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="turma-nome" className="mb-1 block text-sm font-medium text-slate-700">
                Nome da turma
              </label>
              <input
                id="turma-nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                value={idPeriodo}
                onChange={(e) => setIdPeriodo(e.target.value)}
                disabled={loadingPeriodos}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100"
              >
                {loadingPeriodos ? (
                  <option value="">Carregando...</option>
                ) : periodos.length === 0 ? (
                  <option value="">Nenhum período cadastrado</option>
                ) : (
                  periodos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
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
