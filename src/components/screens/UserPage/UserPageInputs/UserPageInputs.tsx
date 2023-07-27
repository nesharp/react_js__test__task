import { FC, useState, Dispatch, SetStateAction } from 'react'
import styles from './UserPageInputs.module.scss'
import Input from './Input/Input'
import { IUser } from '../../../../interfaces/user.interface'
import { useActions } from '../../../../hooks/useActions'
import { useParams } from 'react-router-dom'
interface UserPageInputsProps {
	user: IUser
	setUser: Dispatch<SetStateAction<IUser>>
}
const UserPageInputs: FC<UserPageInputsProps> = ({ user, setUser }) => {
	const { id } = useParams()
	const { changeUser } = useActions()
	return (
		<div className={styles.inputs}>
			<Input
				inputValue={`${user?.name.first} ${user?.name?.last}`}
				buttonValue='Update'
				onClick={() => {
					changeUser({ user, id: id ? +id - 1 : null })
				}}
			/>
			<Input
				input
				inputValue={`${user?.email}`}
				buttonValue='Edit'
				onChange={e => {
					setUser({ ...user, email: e.target.value })
				}}
			/>
			<Input
				input
				inputValue={`${user?.phone}`}
				buttonValue='Edit'
				onChange={e => {
					setUser({ ...user, phone: e.target.value })
				}}
			/>
			<Input
				input
				inputValue={`${user?.location.city}`}
				buttonValue='Edit'
				onChange={e => {
					setUser({
						...user,
						location: { ...user.location, city: e.target.value }
					})
				}}
			/>
			<Input
				input
				inputValue={`${user?.location.street.name} ${user?.location.street.number}`}
				buttonValue='Edit'
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
			/>
			<Input
				input
				inputValue={`${user?.dob.date.split('T')[0]}`}
				buttonValue='Edit'
				onChange={e => {
					setUser({
						...user,
						dob: {
							...user.dob,
							date: e.target.value
						}
					})
				}}
				date
			/>
		</div>
	)
}

export default UserPageInputs
