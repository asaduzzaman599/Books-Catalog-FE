


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

export interface IBook  {
  _id:string
  title: string
  genre: string
  author: string
  publicationDate: Date
  createdBy: IUser
}

export interface IReview  {
  _id:string
  comment: string
  rating: number
  user: IUser
  createdAt: Date
}

export interface IWishList  {
  book: IBook
  user: IUser
}

export interface IReadList  {
  book: IBook
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

export interface IBookQueryType  {
  limit?: number
  search?: string
  publicationYear?: string
  genre?: string
}