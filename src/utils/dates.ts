export enum TIMES {
	minute = 60,
	hour = 60 * 60,
	day = 60 * 60 * 24,
	month = 60 * 60 * 24 * 30,
	year = 60 * 60 * 24 * 30 * 12
}

export const getTwoDigits = (digit: number): string => (digit < 10 ? '0' : '') + digit
export const formatTimeAsDigits = (date: Date) => {
	const hour = getTwoDigits(date.getHours())
	const minute = getTwoDigits(date.getMinutes())
	return `${hour}:${minute}`
}
const formatDateAsDigits = (date: Date, showYear = true) => {
	const year = date.getFullYear()
	const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][date.getMonth()]
	const day = getTwoDigits(date.getDate())
	return `${month} ${day}` + (showYear ? `, ${year}` : '')
}

export const formatTime = (time: number, withoutTime = false) => {
	const date = new Date(time)
	const now = new Date()
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
	const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
	const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
	if (date > today) return withoutTime ? 'Today' : formatTimeAsDigits(date)
	else if (date > yesterday) return 'Yesterday'
	else if (date > lastWeek) return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
	else if (date > oneYearAgo) return formatDateAsDigits(date, false)
	else return formatDateAsDigits(date)
}

export const getTimeFormatted = (timeInSecs: number) => {
	if (timeInSecs < TIMES.minute) {
		return `${timeInSecs} sec${timeInSecs > 1 ? 's' : ''}`
	} else if (timeInSecs < TIMES.hour) {
		const minutes = Math.floor(timeInSecs / TIMES.minute)
		return `${minutes} min${minutes > 1 ? 's' : ''}`
	} else if (timeInSecs < TIMES.day) {
		const hours = Math.floor(timeInSecs / TIMES.hour)
		return `${hours} hr${hours > 1 ? 's' : ''}`
	} else if (timeInSecs < TIMES.month) {
		const days = Math.floor(timeInSecs / TIMES.day)
		return `${days} day${days > 1 ? 's' : ''}`
	} else if (timeInSecs < TIMES.year) {
		const months = Math.floor(timeInSecs / TIMES.month)
		return `${months} mon${months > 1 ? 's' : ''}`
	}
}
