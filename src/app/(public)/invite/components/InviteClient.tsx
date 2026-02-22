'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/stores/auth.store'

interface InviteData {
    className: string
}

interface InviteProps {
    token: string
}


export default function InviteClient({token}:InviteProps){

    const { isAuthenticated } = useAuthStore();

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [inviteData, setInviteData] = useState<InviteData | null>(null)

    useEffect(() => {
        async function init() {
            try {
                console.log(isAuthenticated)
                // Se já estiver logado, vai direto para confirmar entrada
                if (isAuthenticated) {

                    const payload = {
                        token:token
                    }

                    const res = await fetch(`/api/student-class/validate-invite-link`, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                      })
    
                    if (!res.ok) {
                        router.replace('/invite-invalid')
                        return
                    }
    
                    const data = await res.json()
                    setInviteData(data)

                    router.replace(`/invite/${token}/accept`)
                    return
                }

                setLoading(false)
            } catch (error) {
               router.replace('/invite-invalid')
            }
        }

        init()
    }, [token, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-purple-50">
                <p className="text-purple-700 text-lg">Validando convite...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-purple-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">

                <h1 className="text-2xl font-bold text-purple-700">
                    Convite para Turma
                </h1>

                <p className="text-gray-600">
                    Você foi convidado para participar da turma:
                </p>

                <p className="text-lg font-semibold text-purple-600">
                    {inviteData?.className}
                </p>

                <div className="space-y-4 pt-4">

                    <button
                        onClick={() =>
                            router.push(`/?invite=${token}`)
                        }
                        className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
                    >
                        Já possuo conta
                    </button>

                    <button
                        onClick={() =>
                            router.push(`/register-student?invite=${token}`)
                        }
                        className="w-full border border-purple-600 text-purple-600 py-2 rounded-xl hover:bg-purple-50 transition"
                    >
                        Criar nova conta
                    </button>

                </div>

            </div>
        </div>
    )
}