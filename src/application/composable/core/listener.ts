import { ref } from 'vue'

export const useListener = (startFn: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const isRunning = ref(false)
	const watchers = ref(0)

	const close = async () => {
		watchers.value--
		if (watchers.value > 0) return
		listener?.()
		isRunning.value = false
	}

	const start = async () => {
		watchers.value++
		if (watchers.value > 1) return
		listener = await startFn()
		isRunning.value = true
	}

	const reset = async (reset: () => Promise<() => void>) => {
		startFn = reset
		await restart()
	}

	const restart = async () => {
		if (isRunning.value) listener = await startFn()
		else await start()
	}

	return { start, close, reset, restart, isRunning }
}
