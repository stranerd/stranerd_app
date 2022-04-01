import { onMounted, ref } from 'vue'
import { createGesture } from '@ionic/vue'

export const wrapperAsync = async (callback: () => Promise<void>) => {
	try {
		await callback()
	} catch (e) {
		//
	}
}

export const useSwipeGesture = (data: { onRight: () => Promise<void>, onLeft: () => Promise<void> }) => {
	const element = ref(null as HTMLElement | null)

	onMounted(async () => {
		if (!element.value) return
		const style = element.value.style
		const windowWidth = element.value.clientWidth
		await createGesture({
			el: element.value,
			gestureName: 'swipe',
			onStart: () => {
				style.transition = 'none'
			},
			onMove: (ev) => {
				style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`
			},
			onEnd: (ev) => {
				style.transition = '0.3s ease-out'
				style.transformOrigin = 'center bottom'
				if (ev.deltaX > windowWidth / 2) {
					style.transform = `translateX(${windowWidth * 2}px)`
					style.display = 'none'
					wrapperAsync(data.onRight).then()
				} else if (ev.deltaX < -windowWidth / 2) {
					style.transform = `translateX(-${windowWidth * 2}px)`
					style.display = 'none'
					wrapperAsync(data.onLeft).then()
				} else {
					style.transform = ''
				}
			}
		}).enable()
	})

	return { element }
}

export const useDoubleClickGesture = (data: { onDoubleClick: () => Promise<void> }) => {
	const element = ref(null as HTMLElement | null)
	let lastOnStart = 0
	const DOUBLE_CLICK_THRESHOLD = 500

	onMounted(async () => {
		if (!element.value) return
		await createGesture({
			el: element.value,
			gestureName: 'doubleClick',
			threshold: 0,
			onStart: (ev) => {
				const now = Date.now()
				if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
					lastOnStart = 0
					wrapperAsync(data.onDoubleClick).then()
				} else lastOnStart = now
			}
		}).enable()
	})

	return { element }
}
