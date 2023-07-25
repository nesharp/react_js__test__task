import axios from 'axios'
import { IUserData } from '../interfaces/user.interface'

const url = 'https://randomuser.me/api/'
export const userService = {
	async getUsers() {
		const response = await axios<IUserData>({
			method: 'GET',
			url,
			params: {
				seed: 'arixess',
				results: 500
			}
		})
		return response.data ? response.data.results : []
	}
}
