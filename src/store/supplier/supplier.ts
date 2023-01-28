import { BasePaging, useApi } from "@/@core/utils/api";
import { CreateNewSupplierRequest, SupplierResponse, UpdateSupplierRequest } from "./type";

export const useSupplier = defineStore('supplier', {
  state: () => ({
    dataSupplier: {
      items: Array<SupplierResponse>(),
      totalPage: 0,
      totalItem: 0,
      currentPage: 0
    }
  }),
  actions: {
    async getListSupplier() {
      const { get } = useApi()
      const { success, data } = await get<BasePaging<SupplierResponse>>(`/api/v1/suppliers?page=0`)
      if (success) {
        this.dataSupplier.currentPage = data!.currentPage
        this.dataSupplier.items = data!.data
        this.dataSupplier.totalItem = data!.totalItem
        this.dataSupplier.totalPage = data!.totalPage
      }
    },
    async getSupplierById(supplierId: string) {
      const { get } = useApi()
      const response = await get<SupplierResponse>(`/api/v1/supplier/${supplierId}`)

      return {
        ...response
      }
    },
    async createNewSupplier(body: CreateNewSupplierRequest) {
      const { post } = useApi()

      const response = await post<SupplierResponse>(`/api/v1/supplier`, body)

      return {
        ...response
      }
    },
    async updateSupplier(body: UpdateNewSupplierRequest) {
      const { put } = useApi()

      const response = await put<SupplierResponse>(`/api/v1/supplier`, body)

      return {
        ...response
      }
    },
    async deleteSupplier(supplierId: string) {
      const { remove } = useApi()

      const { success, data } = await remove<SupplierResponse>(`/api/v1/supplier/${supplierId}`)
      if (success) {
        const index = this.dataSupplier.items.map((v) => v.supplierId).indexOf(data!.supplierId)

        this.dataSupplier.items.splice(index, 1)

      }

      return success
    }
  }
})
