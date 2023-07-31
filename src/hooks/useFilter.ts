import { useSearchParams } from 'react-router-dom'
import { IUser } from '../interfaces/user.interface'
export const useFilter = (users: IUser[]): IUser[] => {
	const [searchParams, setSearchParams] = useSearchParams()
	const filterName = searchParams.get('name') || ''
	const ageTo = searchParams.get('ageTo') || ''
	const gender = searchParams.get('gender') || ''
	const ageFrom = searchParams.get('ageFrom') || ''

	const filtered = users.filter(user => {
		if (
			!user.name.first.toLowerCase().includes(filterName.toLowerCase()) &&
			!user.name.last.toLowerCase().includes(filterName.toLowerCase())
		) {
			return false
		}
		if (gender !== '' && gender !== null && user.gender !== gender) {
			return false
		}
		if (user.dob.age < +ageFrom || user.dob.age > +ageTo) {
			return false
		}
		return true
	})
	return filtered
}
