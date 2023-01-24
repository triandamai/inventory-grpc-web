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