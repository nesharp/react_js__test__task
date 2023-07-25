import { userSlice } from './user/user.slice'
const userActions = userSlice.actions

export const rootActions = {
	...userActions
}
