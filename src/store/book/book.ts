import { BasePaging, BaseResponse, useApi } from "@/@core/utils/api"
import { Book, CreateBookRequest, ShowBookResponse } from "./type"

export const useBook = defineStore('book', {
  state: () => ({
    dataBook: {
      isLoading: false,
      data: Array<Book>(),
      errorMessage: ''
    }
  }),
  actions: {
    async getListBook() {
      this.dataBook.isLoading = true
      const api = useApi()

      const { data, success, message } = await api.get<BasePaging<Book>>(``)

      this.dataBook.isLoading = false
      if (success) {
        const { data: result } = data
        this.dataBook.data = result
        return
      }
      this.dataBook.errorMessage = message
      this.dataBook.data = []
    },
    async getBookById(id: string): Promise<ShowBookResponse | null> {
      const api = useApi()
      const { data, success } = await api.get<ShowBookResponse>(``)
      return success ? data : null
    },
    async createNewBook(body: CreateBookRequest): Promise<boolean> {
      const api = useApi()
      const { success } = await api.post<any>(``, body)

      return success
    },
    async updateBook(id: string, body: CreateBookRequest): Promise<boolean> {

      const api = useApi()
      const { success } = await api.post<any>(``, body)

      return success

    },
    async deleteBook(id: string): Promise<boolean> {

      const api = useApi()

      const { success } = await api.remove<any>(``)
      return success
    }
  }
})
