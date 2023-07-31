import { IUser } from '../interfaces/user.interface'

export const userValidation = (user: IUser) => {
	if (!user.email.includes('@') || !user.email.includes('.')) {
		alert('Invalid email')
		return
	}
	if (user.phone === '') {
		alert('Invalid phone')
		return
	}
	if (user.location.city.length < 3) {
		alert('Invalid city')
		return
	}
	if (
		user.location.street.name.length < 3 ||
		/[0-9]/.test(user.location.street.name) ||
		/[a-zа-яё]/i.test(user.location.street.number)
	) {
		alert('Invalid street')
		return
	}
	if (
		!user.dob.date.includes('-') ||
		user.dob.date === ''
	) {
		alert('Invalid date of birth')
		return
	}
	return true
}
