import { SignInFormSchema } from "../app/schemas/sing-in-schema"
import { handleResponse } from "../services/handle-response"
import { useAuthStore } from "../stores/auth.store"
import { User } from "../types/User"

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
  
      const data = await handleResponse<User>(response)
  
      login(data)
      return data
    }
  
    return {
      signInProfessor,
      signInStudent,
      logout,
    }
  }
  