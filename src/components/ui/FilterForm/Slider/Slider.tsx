import { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import styles from './Slider.module.scss'
import { PropsWithChildren } from 'react'
import { IAgeFilter } from '../../../../interfaces/filter-interfaces'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
interface ISlider {
	caption?: string
	filterAge: IAgeFilter
	setFilterAge: Dispatch<SetStateAction<IAgeFilter>>
}

const CustomSlider: FC<PropsWithChildren<ISlider>> = ({
	caption,
	filterAge,
	setFilterAge
}) => {
	const sliderRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (sliderRef.current && !sliderRef.current?.innerHTML) {
			const slider = noUiSlider.create(sliderRef.current as HTMLDivElement, {
				start: [filterAge.from, filterAge.to],
				connect: true,
				range: {
					min: 1,
					max: 100
				},
				step: 1
			})
			slider.on('update', values => {
				setFilterAge({
					from: +values[0],
					to: +values[1]
				})
			})
		}
	}, [])

	return (
		<div className={styles.custom__slider}>
			<h4>{caption && caption}</h4>
			<div id='slider' ref={sliderRef} className={styles.slider}></div>
			<div className={styles.range}>
				<p>{`${filterAge.from} - ${filterAge.to}`}</p>
			</div>
		</div>
	)
}
export default CustomSlider
