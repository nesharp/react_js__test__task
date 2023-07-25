import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'
import FilterForm from '../../ui/FilterForm/FilterForm'
import Catalog from '../../ui/Catalog/Catalog'

const Home: FC = () => {
	return (
		<div className={styles.home}>
			<div className={styles.filters}>
				<h2>Filter</h2>
				<FilterForm />
			</div>
			<div className={styles.catalog}>
				<h2>List of users</h2>
				<Catalog />
			</div>
		</div>
	)
}

export default Home
