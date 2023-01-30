import { RoleResponse } from "../role/type"

export type UserResponse = {
  userId: string
  userFullName: string
  userEmail: string,
  authProvider: string,
  image: string,
  roles: Array<RoleResponse>,
  createdAt: string,
  updatedAt: string
}

export type CreateUserByAdminRequest = {
  email: string,
  fullName: string,
  password: string,
  roles: Array<string>
}
