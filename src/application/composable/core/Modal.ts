import { Ref } from 'vue'
import { DefineComponent as Vue } from 'vue'
import { modalController } from '@ionic/vue'

const capitalize = (text: string) => (text[0] ?? '').toUpperCase() + text.slice(1)
const merge = (type: string, key: string) => type + key

function spreadModals<T> (type: string, modals: Record<string, T>) {
	return Object.fromEntries(Object.entries(modals).map(([key, val]) => [merge(type, key), val]))
}

export const useModal = (stack: Ref<string[]>) => {
	const modals = {}

	const close = (id: string) => {
		const index = stack.value.findIndex((i) => i === id)
		if (index > -1) stack.value.splice(index)
	}

	const open = (id: string) => {
		close(id)
		if (Object.keys(modals).includes(id)) stack.value.push(id)
	}

	function register<Key extends string> (type: string, modalObject: Record<Key, Vue>) {
		Object.assign(modals, spreadModals(type, modalObject))

		const helpers = Object.fromEntries(
			Object.entries(modalObject)
				.map(([key, value]) => [capitalize(key), value])
				.map(([key, value]) => {
					let modal = null as any
					return [
						[[`open${key}`], async () => {
							modal = await modalController
								.create({
									component: value,
									cssClass: key,

								})
							modal?.present?.()
						}],
						[[`close${key}`], async () => modal?.dismiss?.()]
					]
				}).reduce((acc, curr) => acc.concat(curr), [])
		) as Record<`open${Capitalize<Key>}` | `close${Capitalize<Key>}`, () => void>


		const closeAll = async () => Object.keys(modalObject).forEach((key) => helpers[`close${capitalize(key) as Capitalize<Key>}`])

		return { ...helpers, closeAll }
	}

	return { stack, modals, open, close, register }
}
