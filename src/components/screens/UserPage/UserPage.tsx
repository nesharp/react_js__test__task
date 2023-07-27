import { FC, useEffect, useRef, useState } from 'react'
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
	const fileInputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		fileInputRef.current?.addEventListener('change', () => {
			const file = fileInputRef.current?.files?.[0]
			const link = URL.createObjectURL(file as Blob)
			setUser({
				...user,
				picture: {
					medium: link,
					large: link,
					thumbnail: link
				}
			})
		})
	}, [fileInputRef])
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
						ref={fileInputRef}
					/>
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
					<UserPageInputs user={user} setUser={setUser} />
				</div>
			</div>
		</div>
	)
}

export default UserPage
