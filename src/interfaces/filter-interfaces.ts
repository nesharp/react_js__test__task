import { EnumFilterType } from '../enums/filter-enums'

export interface IFilterType {
	sortBy: EnumFilterType
	sort: 'asc' | 'desc'
}
export interface IAgeFilter {
	from: number
	to: number
}
export type TypeGender = 'male' | 'female'
export interface IFilter {
	filterName: string
	filterAge: IAgeFilter
	gender: TypeGender
	sort: IFilterType
}
