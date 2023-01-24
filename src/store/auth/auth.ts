import { useApi } from '@/@core/utils/api'
import { useSession } from '@/composables/session'
import { SignInWithEmailRequest, SignInResponse } from './type';

export const useAuth = defineStore('counter', {
  state: () => ({
    isLoading: false,
  }),
  getters: {},
  actions: {
    async signIn(body: SignInWithEmailRequest): Promise<{
      success: boolean
      message: string
    }> {
      const api = useApi()
      const session = useSession()

      const { success, data, message } = await api.post<SignInResponse>(`/api/v1/sign-in-email`, {
        email: body.email,
        password: body.password,
      })
      if (success) {
        session.setUser(data.user)
      }
      return {
        success: success,
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
