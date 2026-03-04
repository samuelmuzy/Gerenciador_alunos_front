"use client";

import { X, Calendar, DollarSign, FileText, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkFormSchema, workSchema } from "@/src/app/schemas/create-work-schema";

interface CreateWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workData: WorkFormSchema) => void;
}

export default function CreateWorkModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateWorkModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkFormSchema>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      description: "",
      value: "",
      startDate: "",
      endDate: "",
    },
  });

  const onFormSubmit = (data: WorkFormSchema) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

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
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          {/* Descrição */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-purple-600" />
              Descrição do Trabalho
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Descreva detalhadamente o trabalho a ser realizado..."
              className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.description ? "border-red-500" : "border-gray-200"
                }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.description.message}
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
                min="0"
                placeholder="0"
                {...register("value")}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.value ? "border-red-500" : "border-gray-200"
                  }`}
              />
            </div>
            {errors.value && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.value.message}
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
                {...register("startDate")}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.startDate ? "border-red-500" : "border-gray-200"
                  }`}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">
                  {errors.startDate.message}
                </p>
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
                {...register("endDate")}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.endDate ? "border-red-500" : "border-gray-200"
                  }`}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">
                  {errors.endDate.message}
                </p>
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