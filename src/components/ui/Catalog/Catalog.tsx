import { FC, useState, useEffect } from 'react'
import styles from './Catalog.module.scss'
import { useSearchParams } from 'react-router-dom'
import { userService } from '../../../services/user.service'
import { useActions } from '../../../hooks/useActions'
import { IUser, IUserData } from '../../../interfaces/user.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import UserCard from './UserCart/UserCard'
import Pagination from './Pagination/Pagination'
import { useQuery } from 'react-query'

interface ICatalog {}
const Catalog: FC<ICatalog> = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { setUsers } = useActions()
	const { users } = useTypedSelector(state => state.user)
	
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	const paginatedData = (): IUser[] => {
		const start = (Number(page) - 1) * Number(perPage)
		if (perPage === 'all') {
			return users
		} else {
			const end = start + Number(perPage)
			return users.slice(start, end)
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
							number: user.location.street.name.split(' ').reverse()[0]
						}
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
				return <UserCard key={index} user={user} id={index + 1} />
			})}
			<Pagination itemsCount={users?.length} />
		</div>
	)
}

export default Catalog
