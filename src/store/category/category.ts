import { addOrReplaceData } from "@/@core/utils"
import { BasePaging, useApi } from "@/@core/utils/api"
import { CategoryResponse, CreateNewCategoryRequest, UpdateCategoryRequest } from "./type"
export const useCategory = defineStore('category', {
  state: () => ({
    dataCategory: {
      items: Array<CategoryResponse>(),
      totalPage: 0,
      totalItem: 0,
      currentPage: 0
    }
  }),
  actions: {
    async getListCategory() {
      const { get } = useApi()

      const { success, data } = await get<BasePaging<CategoryResponse>>(`/api/v1/categories?page=0`)

      if (success) {
        this.dataCategory.currentPage = +data!.currentPage
        this.dataCategory.items = data!.data
        this.dataCategory.totalItem = +data!.totalItem
        this.dataCategory.totalPage = +data!.totalPage
      }
    },
    async createNewCategory(body: CreateNewCategoryRequest): Promise<boolean> {
      const { post } = useApi()

      const { success, data } = await post<CategoryResponse>(`/api/v1/category`, body)

      console.log(success)
      if (success) {
        addOrReplaceData<CategoryResponse>(
          data!,
          this.dataCategory.items,
          "categoryId",
          (item, index) => Object.assign(this.dataCategory.items[index], item),
          (item) => this.dataCategory.items.push(item)
        )
      }
      return success
    },
    async updateCategory(body: UpdateCategoryRequest): Promise<boolean> {
      const { put } = useApi()

      const { success, data } = await put<CategoryResponse>(`/api/v1/category`, body)
      if (success) {
        addOrReplaceData<CategoryResponse>(
          data!,
          this.dataCategory.items,
          "categoryId",
          (item, index) => Object.assign(this.dataCategory.items[index], item),
          (item) => this.dataCategory.items.push(item)
        )
      }
      return success
    },
    async deleteCategory(categoryId: string): Promise<boolean> {
      const { remove } = useApi()

      const { success, data } = await remove<CategoryResponse>(`/api/v1/category/${categoryId}`)
      if (success) {
        const index = this.dataCategory.items.map((v) => v.categoryId).indexOf(data!.categoryId)
        this.dataCategory.items.splice(index, 1)
      }
      return success
    }
  }
})
