import { FC, useState, useEffect } from 'react'
import styles from './Catalog.module.scss'
import { useSearchParams } from 'react-router-dom'
import { userService } from '../../../services/user.service'
import { useActions } from '../../../hooks/useActions'
import { IUser } from '../../../interfaces/user.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import UserCard from './UserCart/UserCard'
import Pagination from './Pagination/Pagination'

interface ICatalog {}
const Catalog: FC<ICatalog> = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { setUsers } = useActions()
	const { users } = useTypedSelector(state => state.user)
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	const paginatedData = () => {
		const start = (Number(page) - 1) * Number(perPage)
		if (perPage === 'all') {
			return users
		} else {
			const end = start + Number(perPage)
			return users.slice(start, end)
		}
	}
	useEffect(() => {
		const users = userService.getUsers()
		users.then((users: IUser[]) => {
			setUsers(users)
		})
	}, [])
	return (
		<div className={styles.catalog}>
			{paginatedData().map((user: IUser, index: number) => {
				return <UserCard key={index} {...user} />
			})}
			<Pagination itemsCount={users.length} />
		</div>
	)
}

export default Catalog
