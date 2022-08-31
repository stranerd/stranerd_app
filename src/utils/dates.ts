export enum TIMES {
	minute = 60,
	hour = 60 * 60,
	day = 60 * 60 * 24,
	month = 60 * 60 * 24 * 30,
	year = 60 * 60 * 24 * 30 * 12
}

export const months = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]

export const getTwoDigits = (digit: number): string => digit.toString().padStart(2, '0')
export const formatTimeAsDigits = (date: Date) => {
	const hour = getTwoDigits(date.getHours())
	const minute = getTwoDigits(date.getMinutes())
	return `${hour}:${minute}`
}
export const formatDateAsDigits = (date: Date, showYear = true) => {
	const year = date.getFullYear()
	const month = months[date.getMonth()].slice(0, 3)
	const day = getTwoDigits(date.getDate())
	return `${month} ${day}` + (showYear ? `, ${year}` : '')
}

export const formatTime = (time: number, withoutTime = false) => {
	const date = new Date(time)
	const now = new Date()
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
	const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
	const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
	if (date >= tomorrow) return formatDateAsDigits(date)
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

export const getDigitalTime = (timeInSecs: number) => {
	const hours = Math.floor(timeInSecs / 3600)
	const minutes = Math.floor((timeInSecs % 3600) / 60)
	const seconds = Math.floor(timeInSecs % 60)
	let hr = ''
	if (hours) hr = `${hours < 10 ? '0' + hours : hours}:`
	const rest = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
	return hr + rest
}
