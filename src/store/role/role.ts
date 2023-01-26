import { BasePaging, useApi } from "@/@core/utils/api";
import { CreateRoleRequest, RoleResponse, UpdateRoleRequest } from "./type";

export const useRole = defineStore('role', {
  state: () => ({
    dataRole: {
      items: Array<RoleResponse>(),
      currentPage: 0,
      totalPage: 0,
      totalItem: 0
    }
  }),
  actions: {
    async getListRole() {
      const { get } = useApi()

      const { success, data, message } = await get<BasePaging<RoleResponse>>(`/api/v1/roles?page=0`)
      if (success) {
        this.dataRole.items = data!.data
        this.dataRole.currentPage = data!.currentPage
        this.dataRole.totalItem = data!.totalItem
        this.dataRole.totalPage = data!.totalPage
      }
    },
    async getRoleById(roleId: string): Promise<RoleResponse | null> {
      const { get } = useApi()
      const { success, data } = await get<RoleResponse>(`/api/v1/role/${roleId}`)
      if (success) return data
      return null

    },
    async createRole(body: CreateRoleRequest) {
      const { post } = useApi()

      const response = await post<RoleResponse>(`/api/v1/role/create`, body)

      return {
        ...response
      }
    },
    async updateRole(body: UpdateRoleRequest) {

      const { put } = useApi()

      const response = await put<RoleResponse>(`/api/v1/role`, body)

      return {
        ...response
      }
    },
    async deleteRole(roleId: string): Promise<boolean> {
      const { remove } = useApi()
      const { success, data } = await remove<RoleResponse>(`/api/v1/role/${roleId}`)

      if (success) {
        const findIndex = this.dataRole.items.map(v => v.roleId).indexOf(data!.roleId)

        this.dataRole.items.splice(findIndex, 1)
      }
      return success
    }
  }
})
