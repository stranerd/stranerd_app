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
	if (typeof el.scroll === 'function') el.scroll({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
	else el.scrollTop = el.scrollHeight
}

const defaultConfig: Config = { smooth: true, notSmoothOnInit: true, always: false, scrollonremoved: true }

export const ChatScroll: ObjectDirective = {
	created: (el, binding) => {
		let scrolled = false

		el.addEventListener('scroll', () => {
			scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight
			if (scrolled && el.scrollTop === 0) el.dispatchEvent(new Event('v-chat-scroll-top-reached'))
		})

		new MutationObserver((e) => {
			const config: Config = binding.value || defaultConfig
			if (config.enabled === false) return
			const pause = config.always === false && scrolled
			const addedNodes = e[e.length - 1].addedNodes.length
			const removedNodes = e[e.length - 1].removedNodes.length

			if (config.scrollonremoved && (pause || addedNodes != 1 && removedNodes != 1)) return
			else if (pause || addedNodes != 1) return

			let smooth = !!config.smooth
			const loadingRemoved = !addedNodes && removedNodes === 1
			if (loadingRemoved && config.scrollonremoved && config.smoothonremoved) smooth = config.smoothonremoved
			scrollToBottom(el, smooth)
		}).observe(el, { childList: true, subtree: true })
	},
	mounted: (el, binding) => {
		const config: Config = binding.value || defaultConfig
		scrollToBottom(el, config.notSmoothOnInit ? false : !!config.smooth)
	}
}
