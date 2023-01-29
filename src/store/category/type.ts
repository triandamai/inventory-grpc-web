export type CategoryResponse = {
  categoryId: string,
  categoryName: string,
  categoryDescription: string,
  createdAt: string,
  updatedAt: string
}

export type CreateNewCategoryRequest = {
  categoryName: string,
  categoryDescription: string,
}

export type UpdateCategoryRequest = {
  categoryId: string,
  categoryName: string,
  categoryDescription: string,
}
