import { BasePaging, useApi } from "@/@core/utils/api";
import { CreateRoleRequest, RoleResponse } from "./type";

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
      const api = useApi()

      const { success, data, message } = await api.get<BasePaging<RoleResponse>>(`/api/v1/roles?page=0`)

      if (success) {
        this.dataRole.items = data.data
        this.dataRole.currentPage = data.currentPage
        this.dataRole.totalItem = data.totalItem
        this.dataRole.totalPage = data.totalPage
      }
    },
    async createRole(body: CreateRoleRequest) {
      const api = useApi()

      const { success, data, message } = await api.post<RoleResponse>(``, body)
    }
  }
})
