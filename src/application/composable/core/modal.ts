import { Component as Vue, Ref } from 'vue'
import { modalController, popoverController } from '@ionic/vue'

const capitalize = (text: string) => (text[0] ?? '').toUpperCase() + text.slice(1)
const merge = (type: string, key: string) => type + key

function spreadModals<T> (type: string, modals: Record<string, T>) {
	return Object.fromEntries(Object.entries(modals).map(([key, val]) => [merge(type, key), { component: val, type }]))
}

export const useModal = (stack: Ref<string[]>) => {
	const modals = {} as Record<string, {
		modal: null | HTMLIonModalElement,
		component: Vue
	}>

	const close = async (id: string) => {
		const modal = modals[id].modal
		if (modal) {
			await modal.dismiss()
			modals[id].modal = null
		}
	}

	const open = async (id: string) => {
		// await close(id)
		if (Object.keys(modals).includes(id)) {
			if (modals[id].modal?.isOpen) return
			const modal = await modalController
				.create({
					component: modals[id].component as any,
					cssClass: 'modal-class',
					breakpoints: [0.1, 0.5, 1],
					initialBreakpoint: 1
				})
			await modal.present()
			modals[id].modal = modal
		}
	}

	function register<Key extends string> (type: string, modalObject: Record<Key, Vue>) {
		Object.assign(modals, spreadModals(type, modalObject))

		const helpers = Object.fromEntries(
			Object.keys(modalObject)
				.map((key) => capitalize(key))
				.map((key) => {
					return [
						[`open${key}`, async () => open(merge(type, key))],
						[`close${key}`, async () => close(merge(type, key))]
					]
				})
				.reduce((acc, curr) => acc.concat(curr), [])
		) as Record<`open${Capitalize<Key>}` | `close${Capitalize<Key>}`, () => void>

		const closeAll = async () => Object.keys(modalObject)
			.forEach((key) => helpers[`close${capitalize(key) as Capitalize<Key>}`]?.())

		return { ...helpers, closeAll }
	}

	return { stack, modals, open, close, register }
}

export const usePopover = (stack: Ref<string[]>) => {
	const popovers = {} as Record<string, {
		popover: null | HTMLIonPopoverElement,
		component: Vue
	}>

	const close = async (id: string) => {
		const popover = popovers[id].popover
		if (popover) {
			await popover.dismiss()
			popovers[id].popover = null
		}
	}

	const open = async (id: string, event: Event) => {
		// await close(id)
		if (Object.keys(popovers).includes(id)) {
			if (popovers[id].popover?.isOpen) return
			const popover = await popoverController
				.create({
					component: popovers[id].component as any,
					cssClass: 'popover-class', event
				})
			await popover.present()
			popovers[id].popover = popover
		}
	}

	function register<Key extends string> (type: string, popoverObject: Record<Key, Vue>) {
		Object.assign(popovers, spreadModals(type, popoverObject))

		const helpers = Object.fromEntries(
			Object.keys(popoverObject)
				.map((key) => capitalize(key))
				.map((key) => {
					return [
						[`open${key}`, async (event: Event) => open(merge(type, key), event)],
						[`close${key}`, async () => close(merge(type, key))]
					]
				})
				.reduce((acc, curr) => acc.concat(curr), [])
		) as Record<`open${Capitalize<Key>}` | `close${Capitalize<Key>}`, ((event?: Event) => void) | (() => void)>

		const closeAll = async () => Object.keys(popoverObject)
			.forEach((key) => helpers[`close${capitalize(key) as Capitalize<Key>}`]?.())

		return { ...helpers, closeAll }
	}

	return { stack, popovers, open, close, register }
}
