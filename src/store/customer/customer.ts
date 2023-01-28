import { BasePaging, useApi } from "@/@core/utils/api";
import { CreateNewCustomerRequest, CustomerResponse, UpdateCustomerRequest } from "./type";

export const useCustomer = defineStore('customer', {
  state: () => ({
    dataCustomer: {
      items: Array<CustomerResponse>(),
      totalPage: 0,
      totalItem: 0,
      currentPage: 0
    }
  }),
  actions: {
    async getListCustomer() {
      const { get } = useApi()
      const { success, data } = await get<BasePaging<CustomerResponse>>(`/api/v1/customers?page=0`)
      if (success) {
        this.dataCustomer.currentPage = data!.currentPage
        this.dataCustomer.items = data!.data
        this.dataCustomer.totalItem = data!.totalItem
        this.dataCustomer.totalPage = data!.totalPage
      }
    },
    async getCustomerById(customerId: string) {
      const { get } = useApi()
      const response = await get<CustomerResponse>(`/api/v1/customer/${customerId}`)

      return {
        ...response
      }
    },
    async createNewCustomer(body: CreateNewCustomerRequest) {
      const { post } = useApi()

      const response = await post<CustomerResponse>(`/api/v1/customer`, body)

      return {
        ...response
      }
    },
    async updateCustomer(body: UpdateCustomerRequest) {
      const { put } = useApi()

      const response = await put<CustomerResponse>(`/api/v1/customer`, body)

      return {
        ...response
      }
    },
    async deleteCustomer(customerId: string) {
      const { remove } = useApi()

      const { success, data } = await remove<CustomerResponse>(`/api/v1/customer/${customerId}`)
      if (success) {
        const index = this.dataCustomer.items.map((v) => v.customerId).indexOf(data!.customerId)

        this.dataCustomer.items.splice(index, 1)

      }

      return success
    }
  }
})
