import { PermissionResponse } from "../permission/type"

export type RoleResponse = {
  roleId: string,
  roleName: string,
  roleDescription: string,
  permissions: Array<PermissionResponse>,
  createdAt: string,
  updatedAt: string
}

export type CreateRoleRequest = {
  roleName: string,
  roleDescription: string,
  permission: Array<string>
}
