import { definePlugin } from '@app/plugins/index'

export const cssListeners = definePlugin(async () => {
	const hasNoGapSupport = () => {
		let flex = document.createElement('div')
		flex.style.display = 'flex'
		flex.style.flexDirection = 'column'
		flex.style.rowGap = '1px'
		flex.style.position = 'fixed'
		flex.style.top = '0'
		flex.style.zIndex = '-1000'
		flex.appendChild(document.createElement('div'))
		flex.appendChild(document.createElement('div'))
		flex = document.body.appendChild(flex)
		const hasSupport = flex.scrollHeight === 1
		flex.parentNode?.removeChild(flex)
		return !hasSupport
	}
	setTimeout(() => {
		document.body.setAttribute('data-no-gap', hasNoGapSupport().toString())
	}, 500)
})
