'use client'

import { UseFormRegister } from 'react-hook-form'
import { CreatePeriodusRegularSchema } from "@/src/app/schemas/create-periodus-schema"
import { FormField } from './FormField'


interface StepFieldsProps {
  stepCount: number
  register: UseFormRegister<CreatePeriodusRegularSchema>
}

export function StepFields({ stepCount, register }: StepFieldsProps) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-medium text-slate-700">Steps configuration</p>
        <p className="text-xs text-slate-500 mt-0.5">Define the start and end date for each step.</p>
      </div>

      {Array.from({ length: stepCount }, (_, i) => (
        <div key={i} className="rounded border border-slate-100 bg-slate-50/50 p-3 space-y-3">
          <p className="text-sm font-medium text-slate-600">Step {i + 1}</p>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start date" htmlFor={`step-${i}-start`}>
              <input
                id={`step-${i}-start`}
                type="date"
                {...register(`etapas.${i}.data_inicio`)}
                className="input"
              />
            </FormField>
            <FormField label="End date" htmlFor={`step-${i}-end`}>
              <input
                id={`step-${i}-end`}
                type="date"
                {...register(`etapas.${i}.data_fim`)}
                className="input"
              />
            </FormField>
          </div>

          <FormField label="Maximum grade" htmlFor={`step-${i}-max-grade`}>
            <input
              id={`step-${i}-max-grade`}
              type="number"
              min={1}
              max={100}
              {...register(`etapas.${i}.nota_maxima_etapa`, { valueAsNumber: true })}
              className="input"
            />
          </FormField>
        </div>
      ))}
    </div>
  )
}