export type SupplierResponse = {
  supplierId: string,
  supplierEmail: string,
  supplierFullName: string,
  supplierOrgName: string,
  supplierPhoneNumber: string,
  supplierAddress: string,
  createdAt: string,
  updatedAt: string
}

export type CreateNewSupplierRequest = {
  supplierEmail: string,
  supplierFullName: string,
  supplierOrgName: string,
  supplierPhoneNumber: string,
  supplierAddress: string
}

export type UpdateSupplierRequest = {
  supplierId: string,
  supplierEmail: string,
  supplierFullName: string,
  supplierOrgName: string,
  supplierPhoneNumber: string,
  supplierAddress: string
}
