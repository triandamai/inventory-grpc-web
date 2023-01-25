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
      const { get } = useApi()

      const { success, data, message } = await get<BasePaging<RoleResponse>>(`/api/v1/roles?page=0`)
      if (success) {
        this.dataRole.items = data.data
        this.dataRole.currentPage = data.currentPage
        this.dataRole.totalItem = data.totalItem
        this.dataRole.totalPage = data.totalPage
      }
    },
    async createRole(body: CreateRoleRequest) {
      const { post } = useApi()

      const response = await post<RoleResponse>(`/api/v1/role/create`, body)

      return {
        ...response
      }
    }
  }
})
