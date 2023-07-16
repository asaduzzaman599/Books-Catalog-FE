

export interface IUser  {
  name: {
    firstName: string
    lastName: string
  }
  _id: string
}

export interface IBooks  {
  _id:string
  genre: string
  author: string
  PublicationDate: string
  createdBy: IUser
}

export interface IResponse<T> {
status?: boolean
message?: string
result?: T
}

export interface ILoginResponse {
  user: IUser
  accessToken: string
}