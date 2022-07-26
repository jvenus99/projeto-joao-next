import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from './store'

export interface UserState {
  id: number
  name?: string
  document?: string
  bank?: {
    bankName?: string
    code?: string
    agency?: string
    account?: string
  }
}

const initialState: Array<UserState> = []

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsers(state, action: { payload: Array<UserState> }) {
      return (state = action.payload)
    },

    updateUser(state, action: { payload: UserState }) {
      return state.map(user => {
        if (user.id === action.payload.id) {
          return action.payload
        }
        return user
      })
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      }
    },
  },
})

export const { fetchUsers, updateUser } = userSlice.actions

export const selectUserState = (state: AppState) => state.user

export default userSlice.reducer
