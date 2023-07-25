import { userSlice } from './user/user.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	user: userSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer
})
export type TypeRootState = ReturnType<typeof rootReducer>