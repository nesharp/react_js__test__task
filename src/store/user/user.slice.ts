import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/user.interface'
import { IFilter } from '../../interfaces/filter-interfaces'
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
		filterUsers: ({ users }, { payload }: PayloadAction<IFilter>) => {
			const filterdByNames = users.filter(user => {
				user.name.first
					.toLowerCase()
					.includes(payload.filterName.toLowerCase()) ||
					user.name.last
						.toLowerCase()
						.includes(payload.filterName.toLowerCase())
			})
			console.log(filterdByNames)
		}
	}
})
