const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]
export const getMonth = (month: number) => {
	return monthNames[month - 1] || ''
}
