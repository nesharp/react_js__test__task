import { useQuery } from 'react-query'
import { IUser } from '../interfaces/user.interface'
import { userService } from '../services/user.service'
import { useActions } from './useActions'
import { useEffect } from 'react'
export const useSetUsers = (isUsersExists: boolean) => {
	const { setUsers } = useActions()
	const {
		data: usersData,
		isLoading,
		error
	} = useQuery(['users'], () => userService.getUsers())
	//setting users
	useEffect(() => {
		if (usersData && !isUsersExists) {
			const changedUsers = usersData.data.results.map(user => {
				user = {
					...user,
					location: {
						...user.location,
						street: {
							...user.location.street,
							number: user.location.street.number.toString()
						}
					},
					dob: {
						...user.dob,
						date: user.dob.date.split('T')[0]
					}
				} as IUser
				return user
			})
			setUsers(changedUsers)
		}
	}, [isLoading])
}
