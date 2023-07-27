import { FC } from 'react'
import { PropsWithChildren } from 'react'
import styles from './PaginationItem.module.scss'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
interface IPaginationItem {
	active?: boolean
	children?: number | string | null | JSX.Element
}
const PaginationItem: FC<PropsWithChildren<IPaginationItem>> = ({
	children,
	active
}) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
	return (
		<button
			className={classNames(styles.paginationItem, active && styles.active)}
			onClick={e => {
				setSearchParams({
					...oldParams,
					page: children ? children.toString() : '1'
				})
			}}
		>
			{children}
		</button>
	)
}

export default PaginationItem
