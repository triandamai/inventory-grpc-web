import { useApi } from '@/@core/utils/api'
import { useSession } from '@/composables/session'
import { SignInWithEmailRequest, SignInResponse } from './type';

export const useAuth = defineStore('auth', {
  state: () => ({
    isLoading: false,
  }),
  getters: {},
  actions: {
    async signIn(body: SignInWithEmailRequest): Promise<{
      success: boolean
      message: string
    }> {
      const { post } = useApi()
      const session = useSession()

      const { success, data, message } = await post<SignInResponse>(`/api/v1/sign-in-email`, {
        email: body.email,
        password: body.password,
      })
      if (success) {
        session.setUser(data!.user)
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
