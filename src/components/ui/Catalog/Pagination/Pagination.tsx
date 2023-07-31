import { FC, useEffect } from 'react'
import styles from './Pagination.module.scss'
import { useSearchParams } from 'react-router-dom'
import PaginationItem from './PaginationItem/PaginationItem'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import PerPageItem from './PerPageItem/PerPageItem'
import { useOldParams } from '../../../../hooks/useOldParams'
const Pagination: FC<{ itemsCount: number }> = ({ itemsCount }) => {
	const { oldParams, searchParams, setSearchParams } = useOldParams()
	const perPage = searchParams.get('perPage')
	const paginationItemsCount =
		perPage === 'all' ? 1 : Math.ceil(itemsCount / Number(perPage))
	const currentPage = searchParams.get('page')
	useEffect(() => {
		setSearchParams({
			...oldParams,
			perPage: oldParams.perPage ? oldParams.perPage : '5',
			page: oldParams.page ? oldParams.page : '1'
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
			{currentPage && (
				<div className={styles.numbers}>
					{paginationItemsCount <= 1 ? (
						<PaginationItem active>1</PaginationItem>
					) : (
						<div>
							{+currentPage > 2 ? <PaginationItem>1</PaginationItem> : null}
							{+currentPage > 3 ? <PaginationItem>2</PaginationItem> : null}
							{+currentPage > 2 ? <p>...</p> : null}
							{+currentPage !== 1 ? (
								<PaginationItem>
									{currentPage && +currentPage - 1}
								</PaginationItem>
							) : null}
							<PaginationItem active>{currentPage}</PaginationItem>
							{+currentPage !== paginationItemsCount ? (
								<PaginationItem>{+currentPage + 1}</PaginationItem>
							) : null}
							{+currentPage < paginationItemsCount - 1 ? <p>...</p> : null}

							{+currentPage < paginationItemsCount - 2 ? (
								<PaginationItem>{paginationItemsCount - 1}</PaginationItem>
							) : null}
							{+currentPage < paginationItemsCount - 1 ? (
								<PaginationItem>{paginationItemsCount}</PaginationItem>
							) : null}
						</div>
					)}
				</div>
			)}
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
