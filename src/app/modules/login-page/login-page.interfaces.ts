export interface IUser {
  login?: string,
  email: string,
  password: string,
  authentication?: boolean
}

export interface IApiUser {
  token: string,
  user: {
    email: string,
    login: string,
    password: string
  }
}
