'use client'

import { useState } from 'react'

interface StepClassProps {
  isSubmitting: boolean
  error: string | null
  onBack: () => void
  onSubmit: (className: string) => Promise<void>
}

export function StepClass({ isSubmitting, error, onBack, onSubmit }: StepClassProps) {
  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)

  const invalid = touched && name.trim().length === 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!name.trim()) return
    await onSubmit(name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="text-sm text-slate-500">
        Período definido com sucesso. Agora informe os dados da turma.
      </p>

      <div>
        <label htmlFor="class-name" className="block text-sm font-medium text-slate-700">
          Nome da turma
        </label>
        <input
          id="class-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="ex: 3º Ano A — Manhã"
          className={[
            'mt-1.5 block w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500',
            invalid ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400',
          ].join(' ')}
        />
        {invalid && (
          <p className="mt-1 text-xs text-red-600">O nome da turma é obrigatório.</p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Criando turma…
            </>
          ) : (
            'Criar turma'
          )}
        </button>
      </div>
    </form>
  )
}