import { BasePaging, useApi } from "@/@core/utils/api";
import { UserResponse, CreateUserByAdminRequest } from "./type";

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
        this.dataUser.items = data!.data
        this.dataUser.currentPage = data!.currentPage
        this.dataUser.totalItem = data!.totalItem
        this.dataUser.totalPage = data!.totalPage
      }
    },
    async getDetailUser(userId: string) {
      const { get } = useApi()

      const response = await get<UserResponse>(`/api/v1/user/${userId}`)

      return {
        ...response
      }
    },
    async createNewUser(body: CreateUserByAdminRequest) {
      const { post } = useApi()

      const response = await post<UserResponse>(`/api/v1/add-user`, body)

      return { ...response }
    },
    async deleteUser(userId: string): Promise<boolean> {
      const { remove } = useApi()

      const { success, data } = await remove<UserResponse>(`/api/v1/user/${userId}`)
      if (success) {
        const findIndex = this.dataUser.items.map((v) => v.userId).indexOf(data!.userId)

        this.dataUser.items.splice(findIndex, 1)
      }
      return success
    }
  }
})
