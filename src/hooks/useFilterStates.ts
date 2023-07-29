import { useSearchParams } from 'react-router-dom'
import {
	IAgeFilter,
	IFilterType,
	TypeGender
} from '../interfaces/filter-interfaces'
import { useState } from 'react'
import { EnumFilterType } from '../enums/filter-enums'
export const useFilterStates = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [gender, setGender] = useState<TypeGender>(
		searchParams.get('gender') as TypeGender
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
	return {
		gender,
		setGender,
		filterName,
		setFilterName,
		filterAge,
		setFilterAge,
		sort,
		setSort
	}
}
