export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  access_token: string
  email: string,
  nama: string,
  token_type: string
}
