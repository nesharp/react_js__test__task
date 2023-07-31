import { useSearchParams } from 'react-router-dom'
import { IUser } from '../interfaces/user.interface'
import { Dispatch, SetStateAction } from 'react'

export const usePaginatedData = (
	users: IUser[],
	// setUsers: Dispatch<SetStateAction<IUser[]>>
) => {
	const [searchParams] = useSearchParams()
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	//--------------------------------------
	const start = (Number(page) - 1) * Number(perPage)
	if (perPage === 'all') {
		return users
		// setUsers(users)
	} else {
		const end = start + Number(perPage)
		return users.slice(start, end)
		// setUsers(users.slice(start, end))
	}
}
