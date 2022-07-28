import { onMounted, onUnmounted, ref } from 'vue'

export const useScripts = (id: string, link: string) => {
	const loaded = ref(false)

	onMounted(() => {
		const script = document.createElement('script')
		script.id = id
		script.src = link
		script.onload = () => {
			loaded.value = true
		}
		document.head.appendChild(script)
	})

	onUnmounted(() => {
		const script = document.querySelector(`script.${id}`)
		if (script) script.parentElement!.removeChild(script)
	})

	return { loaded }
}
