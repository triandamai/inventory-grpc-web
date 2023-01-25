import { BasePaging, useApi } from "@/@core/utils/api";
import { PermissionResponse } from "./type";
import { groupBy } from "@/@core/utils/api"

export const usePermission = defineStore('permission', {
  state: () => ({
    dataPermission: {
      items: Array<PermissionResponse>(),
      totalPage: 0,
      totalItem: 0,
      currentPage: 0
    }
  }),
  actions: {
    async getListPermission() {
      const { get } = useApi()

      const { success, data, message } = await get<BasePaging<PermissionResponse>>(`/api/v1/permission?page=0`)

      if (success) {
        this.dataPermission.items = data.data
        this.dataPermission.currentPage = data.currentPage
        this.dataPermission.totalItem = data.totalItem
        this.dataPermission.totalPage = data.totalPage

      }
    }
  }
})
