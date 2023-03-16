export interface IUserModel {
  email: string,
  displayName: string,
  token: string
}

export interface IUserAddressModel {
  firstName: string,
  lastName: string,
  street: string
  city: string
  state: string
  zipcode: string
}
