import { FC, useEffect } from 'react'
import styles from './PerPageItem.module.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { useSearchParams } from 'react-router-dom'
const PerPageItem: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
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
						perPage: e.target.value
					})
				}}
			>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='50'>50</option>
				<option value='100'>100</option>
				<option value='all'>All</option>
			</select>
			{/* <div className={styles.arrow}>
				<IoIosArrowDown />
			</div> */}
		</div>
	)
}

export default PerPageItem
