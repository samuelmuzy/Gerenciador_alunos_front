import { SignInFormSchema } from "../app/_schemas/sing-in-schema"
import { useAuthStore } from "../stores/auth.store"

export function useAuth() {
    const { login, logout } = useAuthStore()
  
    async function signInProfessor(payload: SignInFormSchema) {
      return signIn('/api/auth/login-professor', payload)
    }
  
    async function signInStudent(payload: SignInFormSchema) {
      return signIn('/api/auth/login-student', payload)
    }
  
    async function signIn(url: string, payload: SignInFormSchema) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao autenticar')
      }
  
      login(data.user)
      return data
    }
  
    return {
      signInProfessor,
      signInStudent,
      logout,
    }
  }
  