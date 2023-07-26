import axios from 'axios'
import { IUserData } from '../interfaces/user.interface'

const url = 'https://randomuser.me/api/'
export const userService = {
	getUsers() {
		const response = axios<IUserData>({
			method: 'GET',
			url,
			params: {
				seed: 'arixess',
				results: 500
			}
		})
		return response
	}
}
