export type CustomerResponse = {
  customerId: string,
  customerEmail: string,
  customerFullName: string,
  customerPhoneNumber: string,
  customerAddress: string,
  createdAt: string,
  updatedAt: string
}

export type CreateNewCustomerRequest = {
  customerEmail: string,
  customerFullName: string,
  customerPhoneNumber: string,
  customerAddress: string
}

export type UpdateCustomerRequest = {
  customerId: string,
  customerEmail: string,
  customerFullName: string,
  customerPhoneNumber: string,
  customerAddress: string
}
