import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import styles from './FilterForm.module.scss'
import Input from './Input/Input'
import CustomSlider from './Slider/Slider'
import GenderCheck from './GenderCheck/GenderCheck'
import DropDown from './DropDown/DropDown'

import { EnumFilterType } from '../../../enums/filter-enums'
import { useActions } from '../../../hooks/useActions'
import { useOldParams } from '../../../hooks/useOldParams'
import { useFilterStates } from '../../../hooks/useFilterStates'
import {
	IAgeFilter,
	ISort,
	TypeGender
} from '../../../interfaces/filter-interfaces'
interface IFilterForm {
	gender: TypeGender
	setGender: Dispatch<SetStateAction<TypeGender>>
	filterName: string
	setFilterName: Dispatch<SetStateAction<string>>
	filterAge: IAgeFilter
	setFilterAge: Dispatch<SetStateAction<IAgeFilter>>
	sort: ISort
	setSort: Dispatch<SetStateAction<ISort>>
}
const FilterForm: FC<IFilterForm> = ({
	gender,
	setGender,
	filterAge,
	setFilterAge,
	filterName,
	setFilterName,
	sort,
	setSort
}) => {
	const { oldParams, setSearchParams } = useOldParams()

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
