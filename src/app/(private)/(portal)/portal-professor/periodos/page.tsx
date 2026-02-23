'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePeriodusRegularSchema, createPeriodusRegularSchema } from "@/src/app/schemas/create-periodus-schema";
import { Periodus } from "@/src/types/Periodus";
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'


export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState<Periodus[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  const toISODateTime = (dateString: string): string => {
    return new Date(dateString).toISOString()
  }

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue, getValues } = useForm<CreatePeriodusRegularSchema>({
    resolver: zodResolver(createPeriodusRegularSchema),
    defaultValues: { quantidade_etapas: 1, nota_maxima: 0, },
  })

  const quantidadeEtapas = watch('quantidade_etapas') ?? 1
  const mostrarEtapas = quantidadeEtapas > 1

  useEffect(() => {
    if (!mostrarEtapas || !Number.isInteger(quantidadeEtapas) || quantidadeEtapas < 2) return
    const atuais = getValues('etapas')
    const prev = Array.isArray(atuais) ? atuais : []
    setValue(
      'etapas',
      Array.from({ length: quantidadeEtapas }, (_, i) => ({
        id_periodo: '',
        nota_maxima_etapa: prev[i]?.nota_maxima_etapa ?? 0,
        data_inicio: prev[i]?.data_inicio ?? '',
        data_fim: prev[i]?.data_fim ?? '',
      }))
    )
  }, [quantidadeEtapas, mostrarEtapas, setValue, getValues])

  const fetchPeriodos = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/periodos', { credentials: 'include' })
      const data = await res.json()
      setPeriodos(Array.isArray(data) ? data : [])

    } catch {
      setPeriodos([])
    } finally {
      setLoading(false)
    }
  }, [])

  const createStep = async (data: CreatePeriodusRegularSchema) => {
    try {
      console.log(data.etapas)
      const res = await fetch('/api/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.etapas),
        credentials: 'include',
      })
      const result = await res.json()

      if (!res.ok) throw new Error(result.message || 'Erro ao criar etapa.')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar período.')
    }
  }

  const createPeriudos = async (data: CreatePeriodusRegularSchema) => {
    try {

      const res = await fetch('/api/periodos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          descricao: data.descricao,
          data_inicio: data.data_inicio,
          data_fim: data.data_fim,
          nota_corte: data.nota_corte
        }),
        credentials: 'include',
      })
      const result = await res.json()

      if (!res.ok) throw new Error(result.message || 'Erro ao criar período.')

      return result;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar período.')
    }
  }



  useEffect(() => {
    fetchPeriodos()
  }, [fetchPeriodos])

  const onSubmit = async (data: CreatePeriodusRegularSchema) => {
    setSubmitting(true)

    try {
      const periodo = await createPeriudos(data)

      const etapas =
        quantidadeEtapas < 2
          ? [{
            id_periodo: periodo.id,
            nome:'Etapa 1',
            nota_maxima_etapa: data.nota_maxima ?? 100,
            data_inicio: toISODateTime(data.data_inicio),
            data_fim: toISODateTime(data.data_fim),
          }]
          : data.etapas!.map((etapa,index) => ({
            id_periodo: periodo.id,
            nome:`Etapa ${index}`,
            nota_maxima_etapa: etapa.nota_maxima_etapa,
            data_fim: toISODateTime(etapa.data_fim),
            data_inicio: toISODateTime(etapa.data_inicio),

          }))

      await createStep({ ...data, etapas })

      reset()
      setShowForm(false)
      await fetchPeriodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar período.')
    } finally {
      setSubmitting(false)
    }
  }

  const deveMostrarFormulario = periodos.length === 0 || showForm

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-slate-900">Períodos</h1>
      <p className="mt-2 text-slate-600">Gerencie os períodos letivos.</p>

      {loading ? (
        <p className="mt-4 text-slate-600">Carregando períodos...</p>
      ) : !deveMostrarFormulario ? (
        <div className="mt-6 space-y-4">
          <p className="text-slate-600">
            {periodos.length} período(s) cadastrado(s).
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Criar período letivo
          </button>
        </div>
      ) : null}

      {deveMostrarFormulario && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {periodos.length === 0 && (
            <p className="mb-4 text-slate-600">Nenhum período cadastrado. Crie o primeiro período letivo abaixo.</p>
          )}
          <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
            <p className="text-sm font-medium text-slate-700">Dados do período letivo</p>
            <div>
              <label htmlFor="nome-periodo" className="mb-1 block text-sm text-slate-600">Nome do período</label>
              <input
                id="nome-periodo"
                type="text"
                {...register('nome')}
                placeholder="Ex: 2025/1"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="descricao-periodo" className="mb-1 block text-sm text-slate-600">Descrição</label>
              <input
                id="descricao-periodo"
                type="text"
                {...register('descricao')}
                placeholder="Ex: Primeiro semestre de 2025"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="data-inicio" className="mb-1 block text-sm text-slate-600">Data início</label>
                <input
                  id="data-inicio"
                  type="date"
                  {...register('data_inicio')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="data-fim" className="mb-1 block text-sm text-slate-600">Data fim</label>
                <input
                  id="data-fim"
                  type="date"
                  {...register('data_fim')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="quantidade-etapas" className="mb-1 block text-sm text-slate-600">Quantidade de etapas do período</label>
              <input
                id="quantidade-etapas"
                type="number"
                min={1}
                max={20}
                {...register('quantidade_etapas', { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {!mostrarEtapas && (
              <div>
                <label htmlFor="quantidade-nota-maxima" className="mb-1 block text-sm text-slate-600">Nota Maxima</label>
                <input
                  id="nota-maxima"
                  type="number"
                  min={1}
                  max={100}
                  {...register(`nota_maxima`, { valueAsNumber: true })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            {mostrarEtapas && (
              <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-700">Datas de cada etapa</p>
                <p className="text-xs text-slate-500">Defina a data de início e fim de cada etapa. A última etapa termina na data fim do período.</p>

                {Array.from({ length: quantidadeEtapas }, (_, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4 rounded border border-slate-100 bg-slate-50/50 p-3">
                    <p className="col-span-2 text-sm font-medium text-slate-600">Etapa {i + 1}</p>
                    <div>
                      <label htmlFor={`etapa-${i}-inicio`} className="mb-1 block text-xs text-slate-600">Data início</label>
                      <input
                        id={`etapa-${i}-inicio`}
                        type="date"
                        {...register(`etapas.${i}.data_inicio`)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`etapa-${i}-fim`} className="mb-1 block text-xs text-slate-600">Data fim</label>
                      <input
                        id={`etapa-${i}-fim`}
                        type="date"
                        {...register(`etapas.${i}.data_fim`)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="quantidade-nota-maxima" className="mb-1 block text-sm text-slate-600">Nota Maxima</label>
                      <input
                        id="nota-maxima"
                        type="number"
                        min={1}
                        max={100}
                        {...register(`etapas.${i}.nota_maxima_etapa`, { valueAsNumber: true })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label htmlFor="nota-corte" className="mb-1 block text-sm text-slate-600">Nota de corte para aprovação</label>
              <input
                id="nota-corte"
                type="number"
                min={0}
                max={100}
                step={0.1}
                {...register('nota_corte', { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>


          {Object.keys(errors).length > 0 && (
            <div className="mt-4 space-y-1">
              {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
              {errors.descricao && <p className="text-sm text-red-600">{errors.descricao.message}</p>}
              {errors.data_inicio && <p className="text-sm text-red-600">{errors.data_inicio.message}</p>}
              {errors.data_fim && <p className="text-sm text-red-600">{errors.data_fim.message}</p>}
              {errors.quantidade_etapas && <p className="text-sm text-red-600">{errors.quantidade_etapas.message}</p>}
              {errors.nota_maxima && <p className="text-sm text-red-600">{errors.nota_maxima.message}</p>}
              {errors.nota_corte && <p className="text-sm text-red-600">{errors.nota_corte.message}</p>}
              {errors.etapas && <p className="text-sm text-red-600">{errors.etapas.message}</p>}
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Salvando...' : 'Salvar período'}
            </button>
            {periodos.length > 0 && (
              <button
                type="button"
                onClick={() => { setShowForm(false); setError(null); reset(); }}
                disabled={submitting}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      {!loading && periodos.length > 0 && !showForm && (
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-medium text-slate-900">Períodos cadastrados</h2>
          <ul className="mt-3 space-y-2">
            {periodos.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded border border-slate-100 bg-slate-50/50 px-3 py-2 text-slate-700">
                <span className="font-medium">{p.nome}</span>
                <span className="text-sm text-slate-500">{p.descricao}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
