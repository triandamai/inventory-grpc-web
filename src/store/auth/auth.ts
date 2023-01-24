import { useApi } from '@/@core/utils/api'
import { useSession } from '@/composables/session'
import { LoginRequest, LoginResponse } from './type';

export const useAuth = defineStore('counter', {
  state: () => ({
    isLoading: false,
  }),
  getters: {},
  actions: {
    async signIn(body: LoginRequest): Promise<{
      success: boolean
      message: string
    }> {
      const api = useApi()
      const session = useSession()

      const { success, data, message } = await api.post<LoginResponse>(`/v1/auth/login`, {
        email: body.email,
        password: body.password,
      })
      if (success) {
        session.setUser(data)
        session.setAccessToken(data.access_token)
        session.setToken(data.token)
      }
      return {
        success: true,
        message: message,
      }
    },
    async signOut(): Promise<boolean> {
      const session = useSession()
      session.signOut()
      return true
    },
  },
})
