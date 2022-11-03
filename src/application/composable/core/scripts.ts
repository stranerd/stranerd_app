import { onMounted, onUnmounted, ref } from 'vue'

export const loadScript = async (id: string, link: string, onLoad?: () => void) => {
	return await new Promise((res: (unload: () => void) => void) => {
		const unload = () => {
			const script = document.querySelector(`script.${id}`)
			script?.parentElement?.removeChild(script)
		}
		let script: HTMLScriptElement | null = document.querySelector(`script.${id}`)
		if (script) {
			onLoad?.()
			return res(unload)
		}
		script = document.createElement('script')
		script.id = id
		script.src = link
		script.onload = () => {
			onLoad?.()
			res(unload)
		}
		if (!script.parentElement) document.head.appendChild(script)
	})
}

export const useScripts = (id: string, link: string) => {
	const loaded = ref(false)
	let unload = () => {
	}

	onMounted(async () => {
		unload = await loadScript(id, link, () => {
			loaded.value = true
		})
	})

	onUnmounted(unload)

	return { loaded }
}
