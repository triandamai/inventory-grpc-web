import { BasePaging, useApi } from "@/@core/utils/api";
import { number } from "@intlify/core-base";
import { UserResponse } from "./type";

export const useUser = defineStore('user', {
  state: () => ({
    dataUser: {
      item: Array<UserResponse>(),
      currentPage: number,
      totalPage: number,
      totalItem: number
    }
  }),
  actions: {
    async getListUser() {
      const api = useApi()

      const { success, data, message } = await api.get<BasePaging<UserResponse>>(`/api/v1/users?page=0`)
      if (success) {
        this.dataUser.item = data.data
      }
    }
  }
})
