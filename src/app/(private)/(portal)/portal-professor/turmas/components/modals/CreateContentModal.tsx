"use client";

import { useState, useRef } from "react";
import { X, Upload, Trash2, FileText, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateContentFormSchema, createContentSchema } from "@/src/app/schemas/create-content-schema";

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contentData: {
    nome: string;
    descricao: string;
    file: File;
  }) => void;
}

export default function CreateContentModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateContentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateContentFormSchema>({
    resolver: zodResolver(createContentSchema),
  });

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setValue("file", selectedFile, { shouldValidate: true });
  };

  const removeFile = () => {
    setFile(null);
    resetField("file");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFormSubmit = (data: CreateContentFormSchema) => {
    onSubmit(data);
    reset();
    setFile(null);
    onClose();
  };

  const handleClose = () => {
    reset();
    setFile(null);
    onClose();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-[#0f0f13] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/[0.06]">

        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-violet-600/10 blur-2xl rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative px-7 pt-7 pb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-1">
              Publicação
            </p>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Novo Conteúdo
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-150 border border-white/[0.06]"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-7 h-px bg-white/[0.06]" />

        <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1 overflow-y-auto">
          <div className="px-7 py-6 space-y-5">

            {/* Nome */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Nome
              </label>
              <input
                {...register("nome")}
                placeholder="Dê um título ao seu conteúdo"
                className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-white text-sm placeholder:text-white/20 outline-none transition-all duration-150 focus:bg-white/[0.06] focus:border-violet-500/50 ${errors.nome ? "border-rose-500/50" : "border-white/[0.08]"
                  }`}
              />
              {errors.nome && (
                <p className="text-xs text-rose-400">{errors.nome.message}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Descrição
              </label>
              <textarea
                {...register("descricao")}
                rows={3}
                placeholder="Descreva brevemente o conteúdo…"
                className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-white text-sm placeholder:text-white/20 outline-none transition-all duration-150 focus:bg-white/[0.06] focus:border-violet-500/50 resize-none ${errors.descricao ? "border-rose-500/50" : "border-white/[0.08]"
                  }`}
              />
              {errors.descricao && (
                <p className="text-xs text-rose-400">{errors.descricao.message}</p>
              )}
            </div>

            {/* Upload — single file */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Arquivo
              </label>

              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${errors.file
                      ? "border-rose-500/40 bg-rose-500/5"
                      : isDragging
                        ? "border-violet-400/60 bg-violet-500/10"
                        : "border-white/[0.1] hover:border-violet-500/40 hover:bg-white/[0.02]"
                    }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-200 ${isDragging ? "bg-violet-500/20" : "bg-white/[0.05] group-hover:bg-violet-500/10"
                      }`}>
                      <Upload className={`w-5 h-5 transition-colors duration-200 ${isDragging ? "text-violet-300" : "text-white/30 group-hover:text-violet-400"
                        }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors">
                        Arraste um arquivo ou <span className="text-violet-400">clique para buscar</span>
                      </p>
                      <p className="text-xs text-white/25 mt-1">Somente um arquivo por publicação</p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{file.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-7 h-7 rounded-lg hover:bg-rose-500/10 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-rose-400 transition-colors" />
                    </button>
                  </div>
                </div>
              )}

              {errors.file && (
                <p className="text-xs text-rose-400">{errors.file.message as string}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-7 pb-7 pt-2 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-sm font-medium text-white/50 hover:text-white/70 transition-all duration-150"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-semibold text-white transition-all duration-150 shadow-lg shadow-violet-900/40"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}