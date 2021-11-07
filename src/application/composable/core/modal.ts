import { DefineComponent as Vue, Ref } from 'vue'
import { modalController } from '@ionic/vue'

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

	const open = async (id: string) => {
		close(id)
		if (Object.keys(modals).includes(id)) {
			modals[id].modal = await modalController
				.create({
					component: modals[id].component,
					cssClass: 'modal-class'

				})
			modals[id].modal?.present?.()
		}
	}

	function register<Key extends string> (type: string, modalObject: Record<Key, Vue>) {
		Object.assign(modals, spreadModals(type, modalObject))

		const helpers = Object.fromEntries(
			Object.entries(modalObject)
				.map(([key, value]) => [capitalize(key), value])
				.map(([key, value]) => {
					let modal = null as any
					return [
						[`open${key}`, async () => open(merge(type, key as string))],
						[`close${key}`, async () => close(merge(type, key as string))]
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
