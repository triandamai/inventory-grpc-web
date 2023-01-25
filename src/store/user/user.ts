import { BasePaging, useApi } from "@/@core/utils/api";
import { UserResponse } from "./type";

export const useUser = defineStore('user', {
  state: () => ({
    dataUser: {
      items: Array<UserResponse>(),
      currentPage: 0,
      totalPage: 0,
      totalItem: 0
    }
  }),
  actions: {
    async getListUser() {
      const { get } = useApi()

      const { success, data, message } = await get<BasePaging<UserResponse>>(`/api/v1/users?page=0`)
      if (success) {
        this.dataUser.items = data.data
        this.dataUser.currentPage = data.currentPage
        this.dataUser.totalItem = data.totalItem
        this.dataUser.totalPage = data.totalPage
      }
    }
  }
})
