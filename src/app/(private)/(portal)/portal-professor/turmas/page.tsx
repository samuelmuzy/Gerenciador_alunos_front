'use client'
import { useState, useEffect, useCallback } from 'react'
import { ModalCreateClass } from '@/src/components/modals/ModalCreateClass'

type Periodo = {
  id: string
  nome: string
  descricao: string
  nota_corte: number
}

type Turma = {
  id: string
  nome: string
  id_periodo: string
  periodo?: Periodo
}

export default function TurmasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchClasses = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/turmas', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setTurmas(Array.isArray(data) ? data : [])
      } else {
        setTurmas([])
      }
    } catch {
      setTurmas([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Turmas</h1>
          <p className="mt-1 text-slate-600">Gerencie as turmas do sistema.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Nova turma
        </button>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            </div>
          ) : turmas.length === 0 ? (
            <div className="py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mx-auto h-12 w-12 text-slate-300"
                aria-hidden
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              <p className="mt-4 text-sm font-medium text-slate-900">Nenhuma turma cadastrada</p>
              <p className="mt-1 text-sm text-slate-500">Clique em &quot;Nova turma&quot; para criar a primeira.</p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Nova turma
              </button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Período
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {turmas.map((turma) => (
                  <tr key={turma.id} className="hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {turma.nome}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {turma.periodo?.nome ?? turma.id_periodo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ModalCreateClass
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchClasses}
      />
    </div>
  )
}
