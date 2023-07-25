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
			page: '1'
		})
	}, [])

	return (
		<div className={styles.pagination}>
			<div className={styles.left}>
				<button
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
				</button>
			</div>
			<div className={styles.numbers}>
				{/* {Array.from(Array(paginationItemsCount).keys()).map((item, index) => {
					return <PaginationItem key={index}>{index + 1}</PaginationItem>
				})} */}

				<PaginationItem>1</PaginationItem>
				<PaginationItem>2</PaginationItem>
				<PaginationItem>3</PaginationItem>
				<p>...</p>
				<PaginationItem>
					{currentPage && +currentPage !== 1 ? +currentPage - 1 : 1}
				</PaginationItem>
				<PaginationItem>{currentPage}</PaginationItem>
				<PaginationItem>{currentPage ? +currentPage + 1 : 3}</PaginationItem>
				<p>...</p>
				<PaginationItem>{paginationItemsCount - 2}</PaginationItem>
				<PaginationItem>{paginationItemsCount - 1}</PaginationItem>
				<PaginationItem>{paginationItemsCount}</PaginationItem>
			</div>
			<div className={styles.right}>
				<button
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
				</button>
			</div>
			<div>
				<PerPageItem />
			</div>
		</div>
	)
}

export default Pagination
