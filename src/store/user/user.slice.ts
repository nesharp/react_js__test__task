import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/user.interface'
import { IFilter, ISort } from '../../interfaces/filter-interfaces'
import { sortByCity, sortByDateOfBirth, sortByNames } from '../../utils/sort-functions'
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
		sortUsers: (state, action: PayloadAction<ISort>) => {
			const { sort } = action.payload
			const sortBy = action.payload.sortBy.toLowerCase()
			if (sortBy === 'name') {
				state.users.sort((user1, user2) => sortByNames(user1, user2, sort))
			}
			if (sortBy === 'dateofbirth') {
				state.users.sort((user1, user2) =>
					sortByDateOfBirth(user1, user2, sort)
				)
			}
			if (sortBy === 'city') {
				state.users.sort((user1, user2) => sortByCity(user1, user2, sort))
			}
		},
		deleteUser: (state, { payload }: PayloadAction<number | null>) => {
			if (payload !== null) {
				state.users = state.users.filter(user => user !== state.users[payload])
			}
		},
		changeUser: (
			state,
			{ payload }: PayloadAction<{ user: IUser; id: number | null }>
		) => {
			if (payload.id !== null) {
				state.users[payload.id] = payload.user
				alert('User changed')
			}
		}
	}
})
