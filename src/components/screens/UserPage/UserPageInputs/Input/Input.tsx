import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface InputProps {
	inputValue: string
	date?: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onClick: (e: Object) => void
}
const Input: FC<InputProps> = ({
	inputValue,
	date = false,
	onChange,
	onClick
}) => {
	const [isBlocked, setIsBlocked] = useState<boolean>(true)
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<div className={styles.wrapper}>
			<div
				className={classNames(styles.input, isBlocked ? styles.disabled : '')}
			>
				<input
					type={date ? 'date' : 'text'}
					value={inputValue}
					readOnly={isBlocked}
					required
					ref={inputRef}
					onChange={e => {
						onChange && onChange(e)
					}}
				/>
			</div>
			<button
				onClick={e => {
					if (isBlocked) {
						setIsBlocked(false)
						inputRef.current?.focus()
					} else {
						setIsBlocked(true)
						onClick(e)

					}
				}}
			>
				{isBlocked ? 'Edit' : 'Update'}
			</button>
		</div>
	)
}

export default Input
