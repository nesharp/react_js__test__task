import { FC } from 'react'
import styles from './Loader.module.scss'
const Loader: FC = () => {
	return (
		<div className={styles.loader}>
			<span className={styles.loader__text}>loading</span>
			<span className={styles.load}></span>
		</div>
	)
}

export default Loader
