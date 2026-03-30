'use client'

import { useState } from 'react'
import { Periodus } from '@/src/types/Periodus'
import { handleResponse } from '@/src/services/handle-response'
import { ApiError } from '@/src/errors/api-error'
import { ModalDeletePeriod } from './modals/ModalDeletePeriod'



interface PeriodListProps {
  periods: Periodus[]
  onDeleted: () => void
}

export function PeriodList({ periods, onDeleted }: PeriodListProps) {
  const [deleteTarget, setDeleteTarget] = useState<Periodus | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  function openDeleteModal(period: Periodus) {
    setDeleteError(null)
    setDeleteTarget(period)
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
      const res = await fetch(`/api/periodos/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await handleResponse(res)
      setDeleteTarget(null)
      onDeleted()
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'Erro ao excluir período.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Períodos Registrados</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {periods.length}
          </span>
        </div>

        <ul className="divide-y divide-slate-100">
          {periods.map((period) => (
            <li
              key={period.id}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{period.nome}</p>
                {period.descricao && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">{period.descricao}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => openDeleteModal(period)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5A.75.75 0 0 1 9.95 6Z" clipRule="evenodd" />
                </svg>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ModalDeletePeriod
        isOpen={!!deleteTarget}
        periodName={deleteTarget?.nome ?? ''}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  )
}