import { configureStore } from '@reduxjs/toolkit'
import { api } from './apiSlice.ts/apiSlice'
import userReducer from './features/user/userSlice'
import booksFilterReducer from './features/books/booksFilter'

export const store = configureStore({
  reducer: {
    user: userReducer,
    filters: booksFilterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch