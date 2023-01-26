import { PermissionResponse } from "../permission/type"

export type RoleResponse = {
  roleId: string,
  roleName: string,
  roleDescription: string,
  permission: Array<PermissionResponse>,
  createdAt: string,
  updatedAt: string
}

export type CreateRoleRequest = {
  roleName: string,
  roleDescription: string,
  permission: Array<string>
}

export type UpdateRoleRequest = {
  roleId: string,
  roleName: string,
  roleDescription: string,
  permission: Array<string>
}
