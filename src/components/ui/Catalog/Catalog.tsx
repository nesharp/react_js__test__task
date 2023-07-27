import { FC, useEffect, useState } from 'react'
import styles from './Catalog.module.scss'
import { useSearchParams } from 'react-router-dom'
import { userService } from '../../../services/user.service'
import { useActions } from '../../../hooks/useActions'
import { IUser } from '../../../interfaces/user.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import UserCard from './UserCart/UserCard'
import Pagination from './Pagination/Pagination'
import { useQuery } from 'react-query'
import { useFilter } from '../../../hooks/useFilter'

interface ICatalog {}
const Catalog: FC<ICatalog> = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { setUsers } = useActions()
	const { users } = useTypedSelector(state => state.user)
	const filteredUsers = useFilter(users)
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	const [dragUser, setDragUsers] = useState<IUser>(users[0])
	const paginatedData = (): IUser[] => {
		const start = (Number(page) - 1) * Number(perPage)
		if (perPage === 'all') {
			return filteredUsers
		} else {
			const end = start + Number(perPage)
			return filteredUsers.slice(start, end)
		}
	}
	const {
		data: usersData,
		isLoading,
		error
	} = useQuery(['users'], () => userService.getUsers())

	useEffect(() => {
		if (usersData && !users.length) {
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
	return (
		<div className={styles.catalog}>
			{paginatedData().map((user: IUser, index: number) => {
				const currentUserId = users.indexOf(user)
				return (
					<UserCard
						key={index}
						user={user}
						id={currentUserId + 1}
						dragedUser={dragUser}
						setDragedUser={setDragUsers}
					/>
				)
			})}
			<Pagination itemsCount={filteredUsers?.length} />
		</div>
	)
}

export default Catalog
