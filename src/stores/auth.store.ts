import { create } from 'zustand'
import { User } from '../types/User'
import { handleResponse } from '../services/handle-response'


export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loadUser: () => Promise<void>
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  loadUser: async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      
      if (!res.ok) throw new Error()

      set({
        user: data,
        isAuthenticated: true,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      })
    }
  },
}))
