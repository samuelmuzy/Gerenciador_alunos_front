import { CheckCircle2, FileText, RefreshCw, Trash2, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatSize } from "@/src/app/_utils/FormatZise"

interface UploadZoneProps {
    onSubmit: (file: File) => Promise<void>
    loading: boolean
}

export function UploadZone({ onSubmit, loading }: UploadZoneProps) {
    const [file, setFile] = useState<File | null>(null)
    const [dragging, setDragging] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const accept = (f: File) => setFile(f)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragging(false)
        const f = e.dataTransfer.files[0]
        if (f) accept(f)
    }

    const handleSubmit = async () => {
        if (!file) return
        await onSubmit(file)
        setFile(null)
        if (ref.current) ref.current.value = ""
    }

    return (
        <div className="space-y-3">
            {!file ? (
                <div
                    onClick={() => ref.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`relative group border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${dragging
                            ? "border-violet-400 bg-violet-50"
                            : "border-slate-200 hover:border-violet-300 hover:bg-slate-50/60"
                        }`}
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${dragging ? "bg-violet-100" : "bg-slate-100 group-hover:bg-violet-50"
                            }`}>
                            <Upload className={`w-6 h-6 transition-colors duration-200 ${dragging ? "text-violet-500" : "text-slate-400 group-hover:text-violet-400"
                                }`} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                                Arraste seu arquivo ou{" "}
                                <span className="text-violet-600 underline underline-offset-2">clique para buscar</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PDF, PNG ou JPG · máx. 5 MB</p>
                        </div>
                    </div>
                    <input
                        ref={ref}
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) accept(f) }}
                    />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200"
                >
                    <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-violet-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{formatSize(file.size)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <button
                            type="button"
                            onClick={() => { setFile(null); if (ref.current) ref.current.value = "" }}
                            className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5 text-slate-300 hover:text-rose-400 transition-colors" />
                        </button>
                    </div>
                </motion.div>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={!file || loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-150 shadow-md shadow-violet-200"
            >
                {loading ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Enviando…</>
                ) : (
                    <><Upload className="w-4 h-4" /> Enviar Trabalho</>
                )}
            </button>
        </div>
    )
}