import { ILoginResponse, IUser } from '@/types/globalTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  token: string
  user: IUser | null
}

const initialState: UserState = {
  token: '',
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      state.token= action.payload.accessToken
      state.user = action.payload.user
    },
    removeUser: (state) => {
      state.token= ''
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer