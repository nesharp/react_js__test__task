import { useSearchParams } from 'react-router-dom'
import { IUser } from '../interfaces/user.interface'
import {
	sortByCity,
	sortByDateOfBirth,
	sortByNames
} from '../utils/sort-functions'
import { SetStateAction, Dispatch } from 'react'
interface ICustomSort {
	users: IUser[]
	firstUser: IUser
	secondUser: IUser
	setUsers: Dispatch<SetStateAction<IUser[]>>
}
export const useSortUsers = (users: IUser[]): IUser[] => {
	const [searchParams] = useSearchParams()
	const sort = searchParams.get('sort')
	const sortBy = searchParams.get('sortBy')
	if (sortBy === 'Name' || sortBy === 'name') {
		users.sort((user1, user2) =>
			sortByNames(user1, user2, sort as 'asc' | 'desc')
		)
		return users
	}
	if (sortBy === 'dateOfBirth') {
		users.sort((user1, user2) =>
			sortByDateOfBirth(user1, user2, sort as 'asc' | 'desc')
		)
		return users
	}
	if (sortBy === 'city') {
		users.sort((user1, user2) =>
			sortByCity(user1, user2, sort as 'asc' | 'desc')
		)
		return users
	}
	return users
}
export const useCustomSortUsers = ({
	users: tempUsers,
	setUsers,
	firstUser,
	secondUser
}: ICustomSort) => {
	const users = [...tempUsers]
	const firstUserId = users.findIndex(
		user => user.login.uuid === firstUser.login.uuid
	)
	const secondUserId = users.findIndex(
		user => user.login.uuid === secondUser.login.uuid
	)
	if (firstUserId !== -1 && secondUserId !== -1) {
		;[users[firstUserId], users[secondUserId]] = [
			users[secondUserId],
			users[firstUserId]
		]
	}
	setUsers(users)
}
