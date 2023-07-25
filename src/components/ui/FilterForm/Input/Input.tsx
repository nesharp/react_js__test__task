import { FC } from 'react'
import styles from './Input.module.scss'
import { PropsWithChildren, Dispatch, SetStateAction } from 'react'
interface IInput {
	children: string
	caption?: string
	filterName: string
	setFilterName: Dispatch<SetStateAction<string>>
}
const Input: FC<PropsWithChildren<IInput>> = ({
	caption,
	children,
	filterName,
	setFilterName
}) => {
	return (
		<div className={styles.custom__input}>
			<h4>{caption && caption}</h4>
			<div className={styles.input}>
				<input
					type='text'
					placeholder={children}
					value={filterName}
					onChange={e => {
						setFilterName(e.target.value)
					}}
				/>
			</div>
		</div>
	)
}

export default Input
