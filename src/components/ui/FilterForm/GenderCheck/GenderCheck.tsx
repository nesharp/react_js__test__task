import { FC, PropsWithChildren } from 'react'
import styles from './GenderCheck.module.scss'
import classNames from 'classnames'
import { TypeGender } from '../../../../interfaces/filter-interfaces'
interface IGenderCheck {
	caption: string
	gender: TypeGender
	setGender: (value: TypeGender) => void
}

const GenderCheck: FC<IGenderCheck> = ({ caption, gender, setGender }) => {
	const changeGender = (gender: TypeGender) => {
		setGender(gender)
		if (gender === 'male') {
		}
	}
	return (
		<div className={styles.checker}>
			<h4>{caption}</h4>
			<div className={styles.buttons}>
				<button
					className={classNames(
						styles.male__button,
						gender === 'male' && styles.active
					)}
					onClick={e => {
						changeGender('male')
					}}
				>
					Male
				</button>
				<button
					className={classNames(
						styles.female__button,
						gender === 'female' && styles.active
					)}
					onClick={e => {
						changeGender('female')
					}}
				>
					Female
				</button>
			</div>
		</div>
	)
}

export default GenderCheck
