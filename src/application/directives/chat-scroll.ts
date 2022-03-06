import { ObjectDirective } from 'vue'

type Config = {
	smooth?: boolean
	always?: boolean
	enabled?: boolean
	scrollonremoved?: boolean
	smoothonremoved?: boolean
	notSmoothOnInit?: boolean
}

const scrollToBottom = (el: Element, smooth: boolean) => {
	setTimeout(() => {
		if (typeof el.scroll === 'function') el.scroll({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
		else el.scrollTop = el.scrollHeight
	}, 1)
}

const defaultConfig: Config = {
	enabled: true,
	smooth: true,
	notSmoothOnInit: true,
	always: false,
	scrollonremoved: true
}

let globalObserver = null as null | MutationObserver

export const ChatScroll: ObjectDirective = {
	mounted: (el, binding) => {
		let scrolled = false
		const config: Config = { ...defaultConfig, ...binding.value }
		scrollToBottom(el, config.notSmoothOnInit ? false : !!config.smooth)

		el.addEventListener('scroll', () => {
			scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight
			if (scrolled && el.scrollTop === 0) el.dispatchEvent(new Event('v-chat-scroll-top-reached'))
		})

		const observer = new MutationObserver((e) => {
			if (!config.enabled) return
			const pause = config.always === false && scrolled
			const addedNodes = e[e.length - 1].addedNodes.length
			const removedNodes = e[e.length - 1].removedNodes.length

			if (config.scrollonremoved) {
				if (pause || addedNodes != 1 && removedNodes != 1) return
			} else if (pause || addedNodes != 1) return

			let smooth = !!config.smooth
			const loadingRemoved = !addedNodes && removedNodes === 1
			if (loadingRemoved && config.scrollonremoved && config.smoothonremoved) smooth = config.smoothonremoved
			scrollToBottom(el, smooth)
		})
		globalObserver = observer
		observer.observe(el, { childList: true, subtree: true })
	},
	unmounted: () => {
		globalObserver?.disconnect()
	}
}
