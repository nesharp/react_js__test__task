import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './UserPage.module.scss'
import UserPageButton from './UserPageButton/UserPageButton'
import Loader from '../../ui/Loader/Loader'
import { getMonth } from '../../../utils/getMonth'
import { IUser } from '../../../interfaces/user.interface'
import UserPageInputs from './UserPageInputs/UserPageInputs'
import { useActions } from '../../../hooks/useActions'
const UserPage: FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const users = useTypedSelector(state => state.user.users)
	const [user, setUser] = useState<IUser>(users[id ? +id - 1 : 0])
	const date = user?.dob?.date?.split('T')[0].split('-')
	const { deleteUser } = useActions()
	return !user ? (
		<Loader />
	) : (
		<div className={styles.userPage}>
			<UserPageButton
				onClick={() => {
					navigate(-1)
				}}
			>
				{'<'} Back
			</UserPageButton>
			<div className={styles.userPage__data}>
				<div className={styles.leftPart}>
					<img src={user?.picture?.large} alt='' />
					<h2>{`${user?.name?.first} ${user?.name?.last}`}</h2>
					<p>{`${date[2]} ${getMonth(+date[1])} ${date[0]}`}</p>
					<UserPageButton
						onClick={() => {
								deleteUser(id ? +id - 1 : null)
								navigate(-1)
						}}
						className={styles.deleteButton}
					>
						Delete
					</UserPageButton>
				</div>

				<div className={styles.rightPart}>
					<UserPageInputs user={user} />
				</div>
			</div>
		</div>
	)
}

export default UserPage
