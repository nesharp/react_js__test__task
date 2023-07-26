import { FC } from 'react'
import styles from './UserPageButton.module.scss'
import { PropsWithChildren } from 'react'
import classNames from 'classnames'
interface UserPageButtonProps {
	className?: string
	onClick: () => void
}
const UserPageButton: FC<PropsWithChildren<UserPageButtonProps>> = ({
	children,
	className,
	onClick
}) => {
	return (
		<button
			className={classNames(styles.button, className)}
			onClick={() => {
				onClick()
			}}
		>
			{children}
		</button>
	)
}

export default UserPageButton
