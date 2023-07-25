import { FC } from 'react'
import { PropsWithChildren } from 'react'
import styles from './PaginationItem.module.scss'
import { useSearchParams } from 'react-router-dom'
interface IPaginationItem {
	onClick?: (e: Event) => void
}
const PaginationItem: FC<PropsWithChildren<IPaginationItem>> = ({
	children
}) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
	return (
		<button
			className={styles.paginationItem}
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
