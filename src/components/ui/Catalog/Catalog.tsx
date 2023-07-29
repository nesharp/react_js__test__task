import { FC, useState } from 'react'
import styles from './Catalog.module.scss'
import { IUser } from '../../../interfaces/user.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import UserCard from './UserCard/UserCard'
import Pagination from './Pagination/Pagination'
import { useFilter } from '../../../hooks/useFilter'
import { usePaginatedData } from '../../../hooks/usePaginatedData'
import { useSetUsers } from '../../../hooks/useSetUsers'

interface ICatalog {}
const Catalog: FC<ICatalog> = () => {
	const { users } = useTypedSelector(state => state.user)
	const filteredUsers = useFilter(users)
	useSetUsers(users.length ? true : false)
	const [draggedUser, setDraggedUsers] = useState<IUser>(users[0])
	const paginatedData = usePaginatedData(filteredUsers)
	return (
		<div className={styles.catalog}>
			{paginatedData.map((user: IUser, index: number) => {
				const currentUserId = users.indexOf(user)
				return (
					<UserCard
						key={index}
						user={user}
						id={currentUserId + 1}
						draggedUser={draggedUser}
						setDraggedUser={setDraggedUsers}
					/>
				)
			})}
			<Pagination itemsCount={filteredUsers?.length} />
		</div>
	)
}

export default Catalog
