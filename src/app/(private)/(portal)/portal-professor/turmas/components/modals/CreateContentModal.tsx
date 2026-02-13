"use client"

import { useState, useRef } from 'react'
import { X, FileText, Upload, File, Trash2, CheckCircle2 } from 'lucide-react'

interface CreateContentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (contentData: ContentData) => void
}

interface ContentData {
  name: string
  description: string
  files: File[]
}

interface FileWithPreview {
  file: File
  id: string
}

export default function CreateContentModal({ isOpen, onClose, onSubmit }: CreateContentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [errors, setErrors] = useState<{
    name?: string
    description?: string
    files?: string
  }>({})
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpa o erro do campo
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles: File[]) => {
    const filesWithPreview = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7)
    }))
    setFiles(prev => [...prev, ...filesWithPreview])
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: '' }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const iconClass = "w-8 h-8"
    
    switch (extension) {
      case 'pdf':
        return <File className={`${iconClass} text-red-500`} />
      case 'doc':
      case 'docx':
        return <File className={`${iconClass} text-blue-500`} />
      case 'xls':
      case 'xlsx':
        return <File className={`${iconClass} text-green-500`} />
      case 'ppt':
      case 'pptx':
        return <File className={`${iconClass} text-orange-500`} />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <File className={`${iconClass} text-purple-500`} />
      case 'zip':
      case 'rar':
        return <File className={`${iconClass} text-yellow-500`} />
      default:
        return <File className={`${iconClass} text-gray-500`} />
    }
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória'
    }

    if (files.length === 0) {
      newErrors.files = 'Adicione pelo menos um arquivo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const contentData: ContentData = {
        name: formData.name,
        description: formData.description,
        files: files.map(f => f.file)
      }
      onSubmit(contentData)
      // Reseta o formulário
      setFormData({ name: '', description: '' })
      setFiles([])
      setErrors({})
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({ name: '', description: '' })
    setFiles([])
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
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Lançamento de Conteúdo</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-purple-600" />
                Nome do Conteúdo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Aula 01 - Introdução à Programação"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-purple-600" />
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva o conteúdo que está sendo disponibilizado..."
                className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Upload de Arquivos */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Upload className="w-4 h-4 text-purple-600" />
                Arquivos
              </label>
              
              {/* Área de Drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50' 
                    : errors.files 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Upload className={`w-8 h-8 ${isDragging ? 'text-purple-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Clique para selecionar ou arraste arquivos aqui
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, XLS, PPT, imagens, vídeos e outros formatos
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              
              {errors.files && (
                <p className="text-sm text-red-500">{errors.files}</p>
              )}

              {/* Lista de Arquivos */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Arquivos selecionados ({files.length})
                    </p>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {files.map((fileItem) => (
                      <div
                        key={fileItem.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          {getFileIcon(fileItem.file.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {fileItem.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(fileItem.file.size)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(fileItem.id)
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer com Botões */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
              >
                Publicar Conteúdo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}