"use client"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

interface StudentCardProps {
    href:string,
    aluno:any
}

export function StudentCard({ aluno,href }: StudentCardProps) {
    const [open, setOpen] = useState(false)


    return (
        <Card className="rounded-2xl shadow-md border border-purple-200 bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-purple-700">
                            {aluno.usuario.nome}
                        </h2>
                        <p className="text-sm text-gray-500">{aluno.usuario.email}</p>
                    </div>
                    <Link
                        href={href}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                    >
                        Ver mais
                    </Link>
                </div>

            </CardContent>
        </Card>
    )
}