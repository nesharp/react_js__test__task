import { FC, useState } from 'react'
import styles from './Catalog.module.scss'
import { IUser } from '../../../interfaces/user.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import UserCard from './UserCard/UserCard'
import Pagination from './Pagination/Pagination'
import { useFilter } from '../../../hooks/useFilter'
import { usePaginatedData } from '../../../hooks/usePaginatedData'
import { useSetUsers } from '../../../hooks/useSetUsers'
import { useSortUsers } from '../../../hooks/useSortUsers'
import { ISort } from '../../../interfaces/filter-interfaces'

interface ICatalog {
	sort: ISort
}
const Catalog: FC<ICatalog> = ({ sort }) => {
	const { users } = useTypedSelector(state => state.user)
	useSetUsers(users.length ? true : false)
	const [draggedUser, setDraggedUsers] = useState<IUser>(users[0])
	const filteredUsers = useFilter(users)
	const sortedUsers = useSortUsers(filteredUsers)
	const paginatedData = usePaginatedData(sortedUsers)
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
