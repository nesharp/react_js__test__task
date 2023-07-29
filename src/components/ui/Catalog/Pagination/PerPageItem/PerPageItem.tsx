import { FC, useEffect, useState } from 'react'
import styles from './PerPageItem.module.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { useOldParams } from '../../../../../hooks/useOldParams'
const PerPageItem: FC = () => {
	const { oldParams, setSearchParams } = useOldParams()
	const [isOpen, setIsOpen] = useState(false)
	useEffect(() => {
		setSearchParams({
			...oldParams,
			perPage: '5'
		})
	}, [])
	return (
		<div className={styles.perPageItem}>
			<select
				onChange={e => {
					setSearchParams({
						...oldParams,
						perPage: e.target.value,
						page: '1'
					})
				}}
				onClick={() => setIsOpen(!isOpen)}
			>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='50'>50</option>
				<option value='100'>100</option>
				<option value='all'>All</option>
			</select>
			<div className={styles.arrow}>
				<IoIosArrowDown
					className={classNames(isOpen && styles.active, styles.image)}
				/>
			</div>
		</div>
	)
}

export default PerPageItem
