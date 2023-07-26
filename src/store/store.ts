import { userSlice } from './user/user.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
	user: userSlice.reducer
})

const persistConfig = {
	key: 'root',
	storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})
export type TypeRootState = ReturnType<typeof rootReducer>
export const persistor = persistStore(store)
