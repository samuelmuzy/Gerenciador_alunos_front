"use client"

import { useState } from 'react'
import { X, Calendar, DollarSign, FileText, Plus } from 'lucide-react'

interface CreateWorkModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (workData: WorkData) => void
}

interface WorkData {
  description: string
  value: string
  startDate: string
  endDate: string
}

export default function CreateWorkModal({ isOpen, onClose, onSubmit }: CreateWorkModalProps) {
  const [formData, setFormData] = useState<WorkData>({
    description: '',
    value: '',
    startDate: '',
    endDate: ''
  })

  const [errors, setErrors] = useState<Partial<WorkData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof WorkData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<WorkData> = {}

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória'
    }

    if (!formData.value) {
      newErrors.value = 'O valor é obrigatório'
    } else if (parseFloat(formData.value) <= 0) {
      newErrors.value = 'O valor deve ser maior que zero'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'A data de início é obrigatória'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'A data de término é obrigatória'
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'A data de término deve ser posterior à data de início'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
      // Reseta o formulário
      setFormData({
        description: '',
        value: '',
        startDate: '',
        endDate: ''
      })
      setErrors({})
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      description: '',
      value: '',
      startDate: '',
      endDate: ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Criar Novo Trabalho</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Descrição */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-purple-600" />
              Descrição do Trabalho
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva detalhadamente o trabalho a ser realizado..."
              className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.description ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <DollarSign className="w-4 h-4 text-purple-600" />
              Valor do Trabalho
            </label>
            <div className="relative">
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.value ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.value && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.value}
              </p>
            )}
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data de Início */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-purple-600" />
                Data de Início
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.startDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>

            {/* Data de Término */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-purple-600" />
                Data de Término
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.endDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
            >
              Criar Trabalho
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}