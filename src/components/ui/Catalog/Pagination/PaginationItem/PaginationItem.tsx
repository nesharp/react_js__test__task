import { FC } from 'react'
import { PropsWithChildren } from 'react'
import styles from './PaginationItem.module.scss'
import classNames from 'classnames'
import { useOldParams } from '../../../../../hooks/useOldParams'
interface IPaginationItem {
	active?: boolean
	children?: number | string | null | JSX.Element
}
const PaginationItem: FC<PropsWithChildren<IPaginationItem>> = ({
	children,
	active
}) => {
	const { oldParams, setSearchParams } = useOldParams()
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
