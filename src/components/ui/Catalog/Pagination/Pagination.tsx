import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import styles from './Pagination.module.scss'
import { useSearchParams } from 'react-router-dom'
import PaginationItem from './PaginationItem/PaginationItem'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import PerPageItem from './PerPageItem/PerPageItem'
const Pagination: FC<{ itemsCount: number }> = ({ itemsCount }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
	const perPage = searchParams.get('perPage')
	const paginationItemsCount =
		perPage === 'all' ? 1 : Math.ceil(itemsCount / Number(perPage))
	const currentPage = searchParams.get('page')
	useEffect(() => {
		setSearchParams({
			...oldParams,
			currentPage: '1',
			page: '1',
			perPage: '5'
		})
	}, [])

	return (
		<div className={styles.pagination}>
			<div className={styles.left}>
				<div
					onClick={() => {
						setSearchParams({
							...oldParams,
							page:
								+oldParams.page === 1
									? oldParams.page
									: (+oldParams.page - 1).toString()
						})
					}}
				>
					<PaginationItem>
						<IoIosArrowBack />
					</PaginationItem>
				</div>
			</div>
			<div className={styles.numbers}>
				{paginationItemsCount === 1 ? (
					<PaginationItem active>1</PaginationItem>
				) : (
					<div>
						<PaginationItem>1</PaginationItem>
						<PaginationItem>2</PaginationItem>
						<p>...</p>
						<PaginationItem>
							{currentPage && +currentPage !== 1 ? +currentPage - 1 : 1}
						</PaginationItem>
						<PaginationItem active>{currentPage}</PaginationItem>
						<PaginationItem>
							{currentPage && +currentPage !== paginationItemsCount
								? +currentPage + 1
								: currentPage}
						</PaginationItem>
						<p>...</p>
						<PaginationItem>{paginationItemsCount - 1}</PaginationItem>
						<PaginationItem>{paginationItemsCount}</PaginationItem>
					</div>
				)}
			</div>
			<div className={styles.right}>
				<div
					onClick={() => {
						setSearchParams({
							...oldParams,
							page:
								+oldParams.page === paginationItemsCount
									? oldParams.page
									: (+oldParams.page + 1).toString()
						})
					}}
				>
					<PaginationItem>
						<IoIosArrowForward />
					</PaginationItem>
				</div>
			</div>
			<div>
				<PerPageItem />
			</div>
		</div>
	)
}

export default Pagination
