import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IBooksFilterOption {
  search: string
  genre : string
  publicationYear :string 
}

const initialState: IBooksFilterOption = {
  search: '',
  genre : '',
  publicationYear :'' 
}

export const booksFilterSlice = createSlice({
  name: 'books-filter',
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
     
      state.search= action.payload
    },
    filterByGenre: (state, action: PayloadAction<string>) => {
      if(action.payload === "All")
      state.genre= ''
      else
      state.genre= action.payload
    },
    filterByPublicationYear: (state, action: PayloadAction<string>) => {
      if(action.payload === "All")
      state.publicationYear= ''
      else
      state.publicationYear= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { filterBySearch, filterByGenre, filterByPublicationYear } = booksFilterSlice.actions

export default booksFilterSlice.reducer