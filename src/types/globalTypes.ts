


export interface IResponse<T> {
  success?: boolean
  message?: string
  result?: T
}

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

export interface IReview  {
  _id:string
  comment: string
  rating: number
  user: IUser
}

export interface IWishList  {
  book: IBooks
  user: IUser
}

export interface IReadList  {
  book: IBooks
  user: IUser
}


export interface ILoginInput {
  email: string
  password: string
}

export interface ISignupInput {
  name: {
    firstName: string
    lastName: string
  }
  phone: string
  email: string
  password: string
}

export interface ILoginResponse {
  user: IUser
  accessToken: string
}