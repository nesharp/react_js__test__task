import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EditButton.module.scss'
interface IEditButton {
	id: number
	onClick?: () => void
}
const EditButton: FC<IEditButton> = ({ id, onClick }) => {
	return (
		<Link to={`/users/${id}}`}>
			<button className={styles.button}>Edit</button>
		</Link>
	)
}

export default EditButton
