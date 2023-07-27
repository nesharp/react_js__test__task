import { useSearchParams } from 'react-router-dom'
import { IUser } from '../interfaces/user.interface'
export const useFilter = (users: IUser[]): IUser[] => {
	const [searchParams, setSearchParams] = useSearchParams()
	const filterName = searchParams.get('name') || ''
	const ageTo = searchParams.get('ageTo') || ''
	const gender = searchParams.get('gender') || ''
	const ageFrom = searchParams.get('ageFrom') || ''
	const filteredByName =
		filterName && filterName !== ''
			? users.filter(
					user =>
						user.name.first.toLowerCase().includes(filterName.toLowerCase()) ||
						user.name.last.toLowerCase().includes(filterName.toLowerCase())
			  )
			: users
	const filteredByGender =
		gender && gender !== '' && gender !== 'null'
			? filteredByName.filter(user => user.gender === gender)
			: filteredByName
	const filteredByAge = filteredByGender.filter(
		user => user.dob.age >= +ageFrom && user.dob.age <= +ageTo
	)
	return filteredByAge
}
