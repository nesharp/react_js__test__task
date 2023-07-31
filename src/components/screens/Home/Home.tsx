import { FC,  } from 'react'
import styles from './Home.module.scss'
import FilterForm from '../../ui/FilterForm/FilterForm'
import Catalog from '../../ui/Catalog/Catalog'
import { useFilterStates } from '../../../hooks/useFilterStates'

const Home: FC = () => {
	const {
		gender,
		setGender,
		filterName,
		setFilterName,
		filterAge,
		setFilterAge,
		sort,
		setSort
	} = useFilterStates()
	return (
		<div className={styles.home}>
			<div className={styles.filters}>
				<h2>Filter</h2>
				<FilterForm
					filterAge={filterAge}
					filterName={filterName}
					setFilterAge={setFilterAge}
					setFilterName={setFilterName}
					gender={gender}
					setGender={setGender}
					sort={sort}
					setSort={setSort}
				/>
			</div>
			<div className={styles.catalog}>
				<h2>List of users</h2>
				<Catalog sort={sort} />
			</div>
		</div>
	)
}

export default Home
