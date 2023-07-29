import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EditButton.module.scss'
interface IEditButton {
	onClick?: () => void
}
const EditButton: FC<IEditButton> = ({ onClick }) => {
	return <div className={styles.button}>Edit</div>
}

export default EditButton
