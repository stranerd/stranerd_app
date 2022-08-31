import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { getTimeFormatted, TIMES } from '@utils/dates'

const startInterval = (dif: number, caller: (time: number) => void) => {
	if (dif <= TIMES.minute) return window.setInterval(() => caller(1), 1000)
	else if (dif <= TIMES.hour) return window.setInterval(() => caller(TIMES.minute), 1000 * TIMES.minute)
	else if (dif <= TIMES.day) return window.setInterval(() => caller(TIMES.hour), 1000 * TIMES.hour)
	else return undefined
}

export const useTimeDifference = (timeInMs: number) => {
	const date = new Date(timeInMs)
	const diffInSec = ref(Math.floor((Date.now() - date.getTime()) / 1000))
	let interval = undefined as number | undefined

	watch(diffInSec, () => {
		if ([TIMES.minute, TIMES.hour, TIMES.day, TIMES.month, TIMES.year].includes(diffInSec.value)) {
			clearInterval(interval)
			interval = startInterval(diffInSec.value, (time: number) => {
				diffInSec.value += time
			})
		}
	})

	const time = computed({
		get: () => {
			if (diffInSec.value < TIMES.year) return getTimeFormatted(diffInSec.value) + ' ago'
			else {
				const year = date.getFullYear()
				const month = [
					'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
				][date.getMonth()]
				return `${month} ${year}`
			}
		}, set: () => {
		}
	})

	const startTimer = () => {
		interval = startInterval(diffInSec.value, (time: number) => {
			diffInSec.value += time
		})
	}
	const stopTimer = () => clearInterval(interval)

	return { time, startTimer, stopTimer, diffInSec }
}

export const useCountdown = (timeInMs: number, triggers: Record<number, () => void>) => {
	const val = Math.floor((timeInMs - Date.now()) / 1000)
	const diffInSec = ref(val < 0 ? 0 : val)
	let interval = undefined as number | undefined

	watch(diffInSec, () => {
		if (val > 0) triggers[diffInSec.value]?.()
		if ([TIMES.minute, TIMES.hour, TIMES.day, TIMES.month, TIMES.year].includes(diffInSec.value)) {
			clearInterval(interval)
			interval = startInterval(diffInSec.value, (time: number) => diffInSec.value -= time)
		}
		if (diffInSec.value <= 0) {
			clearInterval(interval)
			if (diffInSec.value < 0) diffInSec.value = 0
		}
	})

	const time = computed({
		get: () => getTimeFormatted(diffInSec.value),
		set: () => {
		}
	})

	const startTimer = () => {
		interval = startInterval(1, (time: number) => diffInSec.value -= time)
	}
	const stopTimer = () => clearInterval(interval)

	onMounted(startTimer)
	onUnmounted(stopTimer)

	return { time, startTimer, stopTimer, diffInSec }
}
