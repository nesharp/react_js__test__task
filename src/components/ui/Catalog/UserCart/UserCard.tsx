import { FC } from 'react'
import { IUser } from '../../../../interfaces/user.interface'
import styles from './UserCard.module.scss'
import Loader from '../../Loader/Loader'
import { getMonth } from '../../../../utils/getMonth'
import EditButton from './EditButton/EditButton'
import { Link } from 'react-router-dom'
interface IUserProps {
	user: IUser
	id: number
}
const UserCard: FC<IUserProps> = ({user, id}) => {
	const { name, picture, dob, location, email } = user
	const date = dob?.date?.split('T')[0].split('-')
	
	return name ? (
		<div className={styles.userCard}>
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
				<Link to={`/users/${id}`}>
					<EditButton />
				</Link>
			</div>
		</div>
	) : (
		<Loader />
	)
}

export default UserCard
