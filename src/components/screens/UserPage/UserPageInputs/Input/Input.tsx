import { FC, useRef, useState } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'
interface InputProps {
	// onClick: () => void
	input?: boolean
	buttonValue: string
	inputValue: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	date?: boolean
	onClick?: () => void
}
const Input: FC<InputProps> = ({
	input = false,
	buttonValue,
	inputValue,
	onChange,
	date = false,
	onClick = () => {}
}) => {
	const [isBlocked, setIsBlocked] = useState<boolean>(true)
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<div className={styles.wrapper}>
			<div
				className={classNames(
					styles.input,
					input && isBlocked ? styles.disabled : ''
				)}
			>
				<input
					type={date ? 'date' : 'text'}
					value={inputValue}
					readOnly={!input || isBlocked}
					onChange={e => {
						onChange && onChange(e)
					}}
					required
					ref={inputRef}
				/>
			</div>
			<button
				onClick={() => {
					if (input) {
						setIsBlocked(!isBlocked)
						inputRef.current?.focus()
					} else {
						onClick()
					}
				}}
			>
				{buttonValue}
			</button>
		</div>
	)
}

export default Input
