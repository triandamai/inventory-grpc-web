import { addOrReplaceData } from "@/@core/utils"
import { BasePaging, useApi } from "@/@core/utils/api"
import { ProductResponse, CreateNewProductRequest, UpdateProductRequest } from "./type"
export const useProduct = defineStore('product', {
  state: () => ({
    dataProduct: {
      items: Array<ProductResponse>(),
      totalPage: 0,
      totalItem: 0,
      currentPage: 0
    }
  }),
  actions: {
    async getListProduct() {
      const { get } = useApi()

      const { success, data } = await get<BasePaging<ProductResponse>>(`/api/v1/products?page=0`)

      if (success) {
        this.dataProduct.currentPage = +data!.currentPage
        this.dataProduct.items = data!.data
        this.dataProduct.totalItem = +data!.totalItem
        this.dataProduct.totalPage = +data!.totalPage
      }
    },
    async createNewProduct(body: CreateNewProductRequest): Promise<boolean> {
      const { post } = useApi()

      const { success, data } = await post<ProductResponse>(`/api/v1/product`, body)

      if (success) {
        addOrReplaceData<ProductResponse>(
          data!,
          this.dataProduct.items,
          "categoryId",
          (item, index) => Object.assign(this.dataProduct.items[index], item),
          (item) => this.dataProduct.items.push(item)
        )
      }
      return success
    },
    async updateProduct(body: UpdateProductRequest): Promise<boolean> {
      const { put } = useApi()

      const { success, data } = await put<ProductResponse>(`/api/v1/product`, body)
      if (success) {
        addOrReplaceData<ProductResponse>(
          data!,
          this.dataProduct.items,
          "categoryId",
          (item, index) => Object.assign(this.dataProduct.items[index], item),
          (item) => this.dataProduct.items.push(item)
        )
      }
      return success
    },
    async deleteProduct(categoryId: string): Promise<boolean> {
      const { remove } = useApi()

      const { success, data } = await remove<ProductResponse>(`/api/v1/product/${categoryId}`)
      if (success) {
        const index = this.dataProduct.items.map((v) => v.productId).indexOf(data!.productId)
        this.dataProduct.items.splice(index, 1)
      }
      return success
    }
  }
})
