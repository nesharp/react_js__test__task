import { FC, useEffect } from 'react'
import styles from './FilterForm.module.scss'
import Input from './Input/Input'
import CustomSlider from './Slider/Slider'
import GenderCheck from './GenderCheck/GenderCheck'
import DropDown from './DropDown/DropDown'

import { EnumFilterType } from '../../../enums/filter-enums'
import { useActions } from '../../../hooks/useActions'
import { useOldParams } from '../../../hooks/useOldParams'
import { useFilterStates } from '../../../hooks/useFilterStates'

const FilterForm: FC = () => {
	const { sortUsers } = useActions()
	const { oldParams, searchParams, setSearchParams } = useOldParams()

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
	
	useEffect(() => {
		setSearchParams({
			...oldParams,
			gender: gender,
			name: filterName,
			ageFrom: filterAge.from.toString(),
			ageTo: filterAge.to.toString(),
			sort: sort.sort,
			sortBy: sort.sortBy,
			page: '1'
		})
	}, [gender, filterName, filterAge, sort])
	useEffect(() => {
		if (sort.sortBy !== EnumFilterType.customSort) {
			sortUsers(sort)
		}
	}, [sort])
	return (
		<div className={styles.filters}>
			<Input
				caption='Name'
				filterName={filterName}
				setFilterName={setFilterName}
			>
				Search by name
			</Input>
			<CustomSlider
				filterAge={filterAge}
				setFilterAge={setFilterAge}
				caption='Age'
			/>
			<GenderCheck gender={gender} setGender={setGender} caption='Gender' />
			<DropDown caption='Sort By' sort={sort} setSort={setSort} />
		</div>
	)
}

export default FilterForm
