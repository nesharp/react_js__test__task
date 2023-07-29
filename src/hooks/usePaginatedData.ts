import { useSearchParams } from 'react-router-dom'
import { IUser } from '../interfaces/user.interface'

export const usePaginatedData = (filteredUsers: IUser[]) => {
	const [searchParams] = useSearchParams()
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	//--------------------------------------
	const start = (Number(page) - 1) * Number(perPage)
	if (perPage === 'all') {
		return filteredUsers
	} else {
		const end = start + Number(perPage)
		return filteredUsers.slice(start, end)
	}
}
