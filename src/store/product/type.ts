import { CategoryResponse } from "../category/type"

export type ProductResponse = {
  productId: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productUnit: string,
  productOutboundPrice: number,
  productInboundPrice: number,
  category: Array<CategoryResponse>,
  productStock: number,
  createdAt: string,
  updatedAt: string
}

export type CreateNewProductRequest = {
  productName: string,
  productDescription: string,
  productImage: string,
  productUnit: string,
  productOutboundPrice: number,
  productInboundPrice: number,
  category: Array<string>,
  productStock: number,
}

export type UpdateProductRequest = {
  productId: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productUnit: string,
  productOutboundPrice: number,
  productInboundPrice: number,
  category: Array<string>,
  productStock: number,
}
