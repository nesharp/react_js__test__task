import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/user.interface'
import { IFilter, ISort } from '../../interfaces/filter-interfaces'
import {
	sortByCity,
	sortByDateOfBirth,
	sortByNames
} from '../../utils/sort-functions'
const initialState = {
	users: [] as IUser[]
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<IUser[]>) => {
			state.users = action.payload
		},

		deleteUser: (state, { payload }: PayloadAction<string>) => {
			state.users = state.users.filter(user => user.login.uuid !== payload)
		},
		changeUser: (state, { payload }: PayloadAction<{ user: IUser }>) => {
			const userIndex = state.users.findIndex(
				user => user.login.uuid === payload.user.login.uuid
			)
			if (userIndex !== -1) {
				state.users[userIndex] = payload.user
			}
		},
		customSortUsers: (
			state,
			action: PayloadAction<{ firstUser: IUser; secondUser: IUser }>
		) => {
			const { firstUser, secondUser } = action.payload

			const firstUserId = state.users.findIndex(
				user => user.login.uuid === firstUser.login.uuid
			)
			const secondUserId = state.users.findIndex(
				user => user.login.uuid === secondUser.login.uuid
			)

			if (firstUserId !== -1 && secondUserId !== -1) {
				;[state.users[firstUserId], state.users[secondUserId]] = [
					state.users[secondUserId],
					state.users[firstUserId]
				]
			}
		}
	}
})
