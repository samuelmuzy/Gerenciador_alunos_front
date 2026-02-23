"use client"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, BookOpen, FileText, Layers } from "lucide-react"
import CreateWorkModal from "./modals/ReleasesModal"
import CreateContentModal from "./modals/CreateContentModal"
import { StepAndClass, StepAndContent } from "@/src/types/Class-student"
import { FormatDate } from "@/src/app/_utils/FormatDate"

export function StepCard({ etapas }: StepAndContent) {
    const [open, setOpen] = useState(false);
    const [isModalWorkOpen, setIsModalWorkOpen] = useState(false);
    const [isModalContentOpen, setIsModalContentOpen] = useState(false);

    const onSubmit = () => {

    }

    const handleCreateContent = async (data: {
        nome: string;
        descricao: string;
        file: File;
    }) => {
        try {
            const formData = new FormData();

            formData.append("nome", data.nome);
            formData.append("descricao", data.descricao);
            formData.append("etapa_id", String(etapas.id)); // importante

            formData.append("file", data.file);

            formData.append("data_liberacao", etapas.data_inicio.toISOString());

            const response = await fetch(`/api/content`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao criar conteúdo");
            }

            console.log("Conteúdo criado com sucesso");
            setIsModalContentOpen(false);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="rounded-2xl shadow-md border border-purple-200 bg-white">
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-purple-700">
                            {etapas.nome}
                        </h3>
                        <p className="text-sm text-gray-500">{FormatDate(String(etapas.data_inicio)) + " - " + FormatDate(String(etapas.data_fim))}</p>
                    </div>
                    <Button
                        onClick={() => setOpen(!open)}
                        variant="outline"
                        className="border-purple-400 text-purple-600 rounded-xl"
                    >
                        {open ? "Ocultar" : "Gerenciar"}
                    </Button>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <h4 className="font-medium text-purple-600 mb-2">Conteúdos do Semestre</h4>
                                <div className="space-y-2">
                                    {etapas.provas.map((etapa) => (
                                        <div
                                            key={etapa.id}
                                            className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-sm"
                                        >
                                            {etapa.nome}
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={() => setIsModalContentOpen(true)} className="mt-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                                    Lançar Conteúdo
                                </Button>
                            </div>

                            <div>
                                <h4 className="font-medium text-purple-600 mb-2">Trabalhos / Avaliações</h4>
                                <div className="space-y-2">
                                    {etapas.trabalhos.map((etapa) => (
                                        <div
                                            key={etapa.id}
                                            className="p-3 bg-white border border-purple-200 rounded-xl text-sm"
                                        >
                                            {etapa.nome}
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={() => setIsModalWorkOpen(true)} className="mt-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                                    Lançar Trabalho
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
            <CreateWorkModal
                isOpen={isModalWorkOpen}
                onClose={() => setIsModalWorkOpen(false)}
                onSubmit={onSubmit}
            />
            {/* Modal */}
            <CreateContentModal
                isOpen={isModalContentOpen}
                onClose={() => setIsModalContentOpen(false)}
                onSubmit={handleCreateContent}
            />
        </Card>

    )
}