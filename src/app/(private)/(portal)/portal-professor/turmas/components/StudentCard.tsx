"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"




export function StudentCard({ aluno }: any) {
    const [open, setOpen] = useState(false)


    return (
        <Card className="rounded-2xl shadow-md border border-purple-200 bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-purple-700">
                            {aluno.nome}
                        </h2>
                        <p className="text-sm text-gray-500">{aluno.email}</p>
                    </div>
                    <Button
                        onClick={() => setOpen(!open)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                    >
                        {open ? "Fechar" : "Ver mais"}
                    </Button>
                </div>


                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 text-gray-700"
                        >
                            <p><strong>Idade:</strong> {aluno.idade}</p>
                            <p><strong>Média:</strong> {aluno.nota}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}