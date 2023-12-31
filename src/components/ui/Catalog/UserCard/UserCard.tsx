import { FC, SetStateAction, Dispatch, useEffect } from 'react'
import { IUser } from '../../../../interfaces/user.interface'
import styles from './UserCard.module.scss'
import Loader from '../../Loader/Loader'
import { getMonth } from '../../../../utils/getMonth'
import EditButton from './EditButton/EditButton'
import { Link, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { dragStartHandler, useDropHandler } from '../../../../hooks/useHandlers'
interface IUserProps {
	user: IUser
	id: number
	draggedUser?: IUser
	setDraggedUser?: Dispatch<SetStateAction<IUser>>
}

const UserCard: FC<IUserProps> = ({
	user,
	id,
	draggedUser,
	setDraggedUser
}) => {
	const { name, picture, dob, location, email } = user
	const date = dob?.date?.split('T')[0].split('-')
	const [searchParams] = useSearchParams()
	const sort = searchParams.get('sortBy')
	const dropHandler = useDropHandler(draggedUser)

	return name ? (
		<div
			key={id}
			className={classNames(
				styles.userCard,
				sort === 'customSort' && styles.dragAndDrop
			)}
			draggable={sort === 'customSort'}
			onDragStart={e => {
				dragStartHandler(e, user, setDraggedUser)
			}}
			onDragOver={e => {
				e.preventDefault()
			}}
			onDrop={e => {
				dropHandler(e, user)
			}}
		>
			<div className={styles.wrapper}>
				<div className={styles.photo}>
					<img src={picture.large} alt={name?.first} />
				</div>
				<div className={styles.info}>
					<h3>{name.first + ' ' + name.last}</h3>
					<h4>{`${date[2]} ${getMonth(+date[1])} ${date[0]}`}</h4>
					<h5>
						{location.city +
							', ' +
							location.street.name +
							' ' +
							location.street.number}
					</h5>
					<h6>{email}</h6>
				</div>
			</div>
			<div className={styles.editButton}>
				<Link to={`/users/${user.login.uuid}`}>
					<EditButton />
				</Link>
			</div>
		</div>
	) : (
		<Loader />
	)
}

export default UserCard
