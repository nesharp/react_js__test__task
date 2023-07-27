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
			if (
				!payload.user.email.includes('@') ||
				!payload.user.email.includes('.')
			) {
				alert('Invalid email')
				return
			}
			if (payload.user.phone === '') {
				alert('Invalid phone')
				return
			}
			if (payload.user.location.city.length < 3) {
				alert('Invalid city')
				return
			}
			if (
				payload.user.location.street.name.length < 3 ||
				/[0-9]/.test(payload.user.location.street.name) ||
				/[a-zа-яё]/i.test(payload.user.location.street.number)
			) {
				alert('Invalid street')
				return
			}
			if (
				!payload.user.dob.date.includes('-') ||
				/[a-zа-яё]/i.test(payload.user.dob.date) ||
				payload.user.dob.date === ''
			) {
				alert('Invalid date of birth')
				return
			}
			if (payload.id !== null) {
				if (state.users[payload.id] === payload.user) {
					alert('Nothing changed')
				}
				state.users[payload.id] = payload.user
				alert('User changed')
			}
		},
		customSortUsers: (
			state,
			action: PayloadAction<{ firstUser: IUser; secondUser: IUser }>
		) => {
			const { firstUser, secondUser } = action.payload

			const firstUserId = state.users.findIndex(
				user => user.id.value === firstUser.id.value
			)
			const secondUserId = state.users.findIndex(
				user => user.id.value === secondUser.id.value
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
