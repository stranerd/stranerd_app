import {  onMounted, onBeforeUnmount } from 'vue'

export const useLoadScript = () => {
	const load =(script: string): any=>{
		const newScript = document.createElement('script')
		newScript.id = script
		newScript.src = script
		document.body.appendChild(newScript)
	}
	const unload =(script: string): any=>{
		if(document.getElementById(script)){
			const removeScript = document?.getElementById(script) as HTMLElement
			document.body.removeChild(removeScript)
		}

	}

	return{
		load, unload
	}
}
