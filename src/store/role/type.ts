export type RoleResponse = {
  roleId: string,
  roleName: string,
  roleDescription: string,
  createdAt: string,
  updatedAt: string
}

export type CreateRoleRequest = {
  roleName: string,
  roleDescription: string
}
