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
			.forEach((key) => helpers[`close${capitalize(key) as Capitalize<Key>}`])

		return { ...helpers, closeAll }
	}

	return { stack, modals, open, close, register }
}

export const usePopover = (stack: Ref<string[]>) => {
	const popover = {} as any

	const close = (id: string) => {
		popover[id].popover?.dismiss?.()
	}

	const open = async (id: string, cssClass: string) => {
		close(id)
		if (Object.keys(popover).includes(id)) {
			popover[id].popover = await popoverController
				.create({
					component: popover[id].component,
					cssClass: cssClass

				})
			popover[id].popover?.present?.()
		}
	}

	function register<Key extends string> (type: string, popoverObject: Record<Key, Vue>, css: string) {
		Object.assign(popover, spreadModals(type, popoverObject))

		const helpers = Object.fromEntries(
			Object.keys(popoverObject)
				.map((key) => capitalize(key))
				.map((key) => {
					return [
						[`open${key}`, async () => open(merge(type, key), css)],
						[`close${key}`, async () => close(merge(type, key))]
					]
				})
				.reduce((acc, curr) => acc.concat(curr), [])
		) as Record<`open${Capitalize<Key>}` | `close${Capitalize<Key>}`, () => void>

		const closeAll = async () => Object.keys(popoverObject)
			.forEach((key) => helpers[`close${capitalize(key) as Capitalize<Key>}`])

		return { ...helpers, closeAll }
	}

	return { stack, popOvers: popover, open, close, register }
}
