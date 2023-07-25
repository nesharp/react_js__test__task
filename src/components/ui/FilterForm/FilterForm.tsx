import { FC, useState, useEffect } from 'react'
import styles from './FilterForm.module.scss'
import Input from './Input/Input'
import CustomSlider from './Slider/Slider'
import GenderCheck from './GenderCheck/GenderCheck'
import DropDown from './DropDown/DropDown'
import { useSearchParams } from 'react-router-dom'
import {
	IAgeFilter,
	IFilterType,
	TypeGender
} from '../../../interfaces/filter-interfaces'
import { EnumFilterType } from '../../../enums/filter-enums'
import { useActions } from '../../../hooks/useActions'

const FilterForm: FC = () => {
	//actions
	const { filterUsers } = useActions()
	//old params and params hook
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
	//filter state
	const [gender, setGender] = useState<TypeGender>(
		searchParams.get('gender') as TypeGender | 'male'
	)
	const [filterName, setFilterName] = useState<string>(
		(searchParams.get('name') || '') as string
	)
	const [filterAge, setFilterAge] = useState<IAgeFilter>({
		from: searchParams.get('ageFrom') ? Number(searchParams.get('ageFrom')) : 0,
		to: searchParams.get('ageTo') ? Number(searchParams.get('ageTo')) : 100
	})
	const [sort, setSort] = useState<IFilterType>({
		sort: (searchParams.get('sort') as 'asc' | 'desc') || 'asc',
		sortBy:
			(searchParams.get('sortBy') as EnumFilterType) || EnumFilterType.Name
	})
	useEffect(() => {
		setSearchParams({
			...oldParams,
			gender: gender,
			name: filterName,
			ageFrom: filterAge.from.toString(),
			ageTo: filterAge.to.toString(),
			sort: sort.sort,
			sortBy: sort.sortBy
		})
		filterUsers({
			gender,
			filterName,
			filterAge,
			sort
		})
	}, [gender, filterName, filterAge, sort])
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
