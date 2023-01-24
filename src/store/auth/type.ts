import { UserResponse } from "@/store/user/type"
export type SignInWithEmailRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  success: boolean,
  message: string,
  user: UserResponse
}
