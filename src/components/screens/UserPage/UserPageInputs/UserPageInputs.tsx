import { FC, Dispatch, SetStateAction } from 'react'
import styles from './UserPageInputs.module.scss'
import Input from './Input/Input'
import { IUser } from '../../../../interfaces/user.interface'
import { useActions } from '../../../../hooks/useActions'
import { userValidation } from '../../../../hooks/useValidation'
interface UserPageInputsProps {
	user: IUser
	setUser: Dispatch<SetStateAction<IUser>>
}
const UserPageInputs: FC<UserPageInputsProps> = ({ user, setUser }) => {
	const { changeUser } = useActions()
	return (
		<div className={styles.inputs}>
			<Input
				inputValue={`${user?.name.first} ${user?.name?.last}`}
				onChange={e => {
					setUser({
						...user,
						name: {
							...user.name,
							first: e.target.value.split(' ').slice(0, -1).join(' '),
							last: e.target.value.split(' ').reverse()[0]
						}
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
			
			<Input
				inputValue={`${user.email}`}
				onChange={e => {
					setUser({
						...user,
						email: e.target.value
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
			<Input
				inputValue={`${user.phone}`}
				onChange={e => {
					setUser({
						...user,
						phone: e.target.value
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
			<Input
				inputValue={`${user.location.city}`}
				onChange={e => {
					setUser({
						...user,
						location: {
							...user.location,
							city: e.target.value
						}
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
			<Input
				inputValue={`${user.location.street.name} ${user.location.street.number}`}
				onChange={e => {
					setUser({
						...user,
						location: {
							...user.location,
							street: {
								...user.location.street,
								name: e.target.value.split(' ').slice(0, -1).join(' '),
								number: e.target.value.split(' ').reverse()[0]
							}
						}
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
			<Input
				inputValue={`${new Date(user.dob.date).toLocaleDateString().split('.').reverse().join('-')}`}
				date
				onChange={e => {
					setUser({
						...user,
						dob: {
							...user.dob,
							date: new Date(e.target.value).toISOString()
						}
					})
				}}
				onClick={e => {
					if (userValidation(user)) {
						changeUser({ user })
						alert('User updated')
					}
				}}
			/>
		</div>
	)
}

export default UserPageInputs
