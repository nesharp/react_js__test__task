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
import { useSetUsers } from '../../../hooks/useSetUsers'
const UserPage: FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const users = useTypedSelector(state => state.user.users)
	const userIndex = users.findIndex((user: IUser) => user.login.uuid === id)
	const [user, setUser] = useState<IUser>(users[userIndex])
	const date = user?.dob?.date?.split('T')[0].split('-')
	const { deleteUser, changeUser } = useActions()
	useSetUsers(users.length ? true : false)
	useEffect(() => {
		setUser(users[userIndex])
	}, [users])
	return !user ? (
		<Loader />
	) : (
		<div className={styles.userPage}>
			<UserPageButton
				onClick={() => {
					navigate(-1)
				}}
				className={styles.backButton}
			>
				{'<'} Back
			</UserPageButton>
			<div className={styles.userPage__data}>
				<div className={styles.leftPart}>
					<label htmlFor='picture'>
						<img src={user?.picture?.large} alt='' />
					</label>
					<input
						type='file'
						id='picture'
						accept='image/png, image/gif, image/jpeg'
						onChange={e => {
							const file = e.currentTarget.files?.[0]
							const link = URL.createObjectURL(file as Blob)
							const changedUser = {
								...user,
								picture: {
									large: link,
									medium: link,
									thumbnail: link
								}
							}
							changeUser({ user: changedUser })
						}}
					/>
					<h2>{`${user?.name?.first} ${user?.name?.last}`}</h2>
					<p>{`${date[2]} ${getMonth(+date[1])} ${date[0]}`}</p>
					<UserPageButton
						onClick={() => {
							deleteUser(user.login.uuid)
							navigate(-1)
						}}
						className={styles.deleteButton}
					>
						Delete
					</UserPageButton>
				</div>

				<div className={styles.rightPart}>
					<UserPageInputs user={user} setUser={setUser} />
				</div>
			</div>
		</div>
	)
}

export default UserPage
