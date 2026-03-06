'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface InviteData {
    className: string
}

interface InviteProps {
    token: string
}

export default function AcceptClient({ token }: InviteProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [inviteData, setInviteData] = useState<InviteData | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleAccept() {
        setLoading(true)
        try {
            setSubmitting(true)

            const payload = {
                token:token
            }

            const res = await fetch(`/api/student-class/validate-invite-link`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
              })

            const data = await res.json()
            
            setInviteData(data)

            if (!res.ok) {
                alert('Erro ao entrar na turma')
                setSubmitting(false)
                return
            }

            router.push('/portal-aluno')
        } catch {
            alert('Erro inesperado')
            setSubmitting(false)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-purple-50">
                <p className="text-purple-700 text-lg">Validando convite...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-purple-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">

                <h1 className="text-2xl font-bold text-purple-700">
                    Confirmar entrada
                </h1>

                <p className="text-gray-600">
                    Você foi convidado para entrar na turma:
                </p>

                <p className="text-lg font-semibold text-purple-600">
                    {inviteData?.className}
                </p>

                <button
                    onClick={handleAccept}
                    disabled={submitting}
                    className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
                >
                    {submitting ? 'Entrando...' : 'Entrar na turma'}
                </button>

                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full text-gray-500 hover:text-gray-700 transition"
                >
                    Cancelar
                </button>

            </div>
        </div>
    )
}