import { Component as Vue, Ref } from 'vue'
import { modalController, popoverController } from '@ionic/vue'

const capitalize = (text: string) => (text[0] ?? '').toUpperCase() + text.slice(1)
const merge = (type: string, key: string) => type + key

function spreadModals<T> (type: string, modals: Record<string, T>) {
	return Object.fromEntries(Object.entries(modals).map(([key, val]) => [merge(type, key), { component: val, type }]))
}

export const useModal = (stack: Ref<string[]>) => {
	const modals = {} as any

	const close = (id: string) => {
		modals[id].modal?.dismiss?.()
		modals[id].modal = null
	}

	const open = async (id: string, cssClass: string) => {
		close(id)
		if (Object.keys(modals).includes(id)) {
			modals[id].modal = await modalController
				.create({
					component: modals[id].component,
					cssClass: cssClass
				})
			modals[id].modal?.present?.()
		}
	}

	function register<Key extends string> (type: string, modalObject: Record<Key, Vue>, css: string) {
		Object.assign(modals, spreadModals(type, modalObject))

		const helpers = Object.fromEntries(
			Object.keys(modalObject)
				.map((key) => capitalize(key))
				.map((key) => {
					return [
						[`open${key}`, async () => open(merge(type, key), css)],
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
	const popovers = {} as any

	const close = (id: string) => {
		popovers[id].popover?.dismiss?.()
		popovers[id].popover = null
	}

	const open = async (id: string, cssClass: string, event: Event) => {
		close(id)
		if (Object.keys(popovers).includes(id)) {
			popovers[id].popover = await popoverController
				.create({
					component: popovers[id].component,
					cssClass, event
				})
			popovers[id].popover?.present?.()
		}
	}

	function register<Key extends string> (type: string, popoverObject: Record<Key, Vue>, css: string) {
		Object.assign(popovers, spreadModals(type, popoverObject))

		const helpers = Object.fromEntries(
			Object.keys(popoverObject)
				.map((key) => capitalize(key))
				.map((key) => {
					return [
						[`open${key}`, async (event: Event) => open(merge(type, key), css, event)],
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
