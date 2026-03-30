'use client'
import { useState, useEffect, useCallback } from 'react'

import { ClassStudent } from '@/src/types/Class-student'
import { handleResponse } from '@/src/services/handle-response'
import { ApiError } from '@/src/errors/api-error'
import Link from 'next/link'
import { ModalCreateClass } from './components/modals/ModalCreateClass'
import { ModalDeleteClass } from './components/modals/ModalDeleteClass'

export default function TurmasPage() {
  const [turmas, setTurmas] = useState<ClassStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  // delete state
  const [deleteTarget, setDeleteTarget] = useState<ClassStudent | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const fetchClasses = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/student-class', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setTurmas(data)
      }
    } catch (error) {
      console.error('Erro ao buscar turmas:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  function openDeleteModal(turma: ClassStudent) {
    setDeleteError(null)
    setDeleteTarget(turma)
  }

  function closeDeleteModal() {
    if (isDeleting) return
    setDeleteTarget(null)
    setDeleteError(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      const res = await fetch(`/api/student-class/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await handleResponse(res)
      setDeleteTarget(null)
      await fetchClasses()
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'Erro ao excluir turma.')
    } finally {
      setIsDeleting(false)
    }
  }

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
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Ações
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
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/portal-professor/turmas/${turma.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Gerenciar
                        </Link>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(turma)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5A.75.75 0 0 1 9.95 6Z" clipRule="evenodd" />
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Inline delete error (fallback case) */}
        {deleteError && !deleteTarget && (
          <p className="mt-3 text-sm text-red-600">{deleteError}</p>
        )}
      </div>

      <ModalCreateClass
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchClasses}
      />

      <ModalDeleteClass
        isOpen={!!deleteTarget}
        className={deleteTarget?.nome ?? ''}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  )
}