import { FC, useState } from 'react'
import styles from './DropDown.module.scss'
import { IFilterType } from '../../../../interfaces/filter-interfaces'
import { EnumFilterType } from '../../../../enums/filter-enums'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import classNames from 'classnames'
import { capitalize } from '../../../../utils/word-capitalize'
interface IDropDown {
	caption: string
	sort: IFilterType
	setSort: (filter: IFilterType) => void
}
const DropDown: FC<IDropDown> = ({ caption, sort, setSort }) => {
	const [isListOpen, setIsListOpen] = useState<boolean>(false)
	return (
		<div className={styles.custom__dropdown}>
			<h4>{caption}</h4>
			<div className={styles.dropdown}>
				<div className={styles.dropdown__wrapper}>
					<select
						name='dropdown'
						id='dropdown'
						value={sort.sortBy}
						onChange={e => {
							setSort({
								sort: sort.sort,
								sortBy: e.target.value as EnumFilterType
							})
						}}
						onClick={() => {
							setIsListOpen(!isListOpen)
						}}
					>
						{Object.keys(EnumFilterType).map(key => (
							<option key={key} value={key}>
								{capitalize(key)}
							</option>
						))}
					</select>
					<p className={isListOpen ? styles.opened : ''}>{'>'}</p>
				</div>
				<div className={styles.sortType}>
					<button>
						<BiSolidUpArrow
							className={classNames(
								styles.arrow,
								sort.sort === 'asc' && styles.active
							)}
							onClick={() => {
								setSort({
									sort: 'asc',
									sortBy: sort.sortBy
								})
							}}
						/>
					</button>
					<button>
						<BiSolidDownArrow
							className={classNames(
								styles.arrow,
								sort.sort === 'desc' && styles.active
							)}
							onClick={() => {
								setSort({
									sort: 'desc',
									sortBy: sort.sortBy
								})
							}}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default DropDown
