import { FC, Dispatch, SetStateAction } from 'react'
import styles from './Slider.module.scss'
import { PropsWithChildren } from 'react'
import { IAgeFilter } from '../../../../interfaces/filter-interfaces'

interface ISlider {
	caption?: string
	filterAge: IAgeFilter
	setFilterAge: Dispatch<SetStateAction<IAgeFilter>>
}

const CustomSlider: FC<PropsWithChildren<ISlider>> = ({ caption }) => {
	return (
		<div className={styles.custom__slider}>
			<h4>{caption && caption}</h4>
			<div className={styles.slider}>
				<input
					type='range'
					min='1'
					max='25'
					value={1}
					className={styles.slider1}
				/>
				<input
					type='range'
					min='1'
					max='25'
					value={10}
					className={styles.slider2}
				/>
			</div>
			<div className={styles.range}>
				<p>1 - 25</p>
			</div>
		</div>
	)
}

export default CustomSlider
