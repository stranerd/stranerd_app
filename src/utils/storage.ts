import { Storage } from '@capacitor/storage'

export const storage = {
	get: async (key: string) => {
		const { value } = await Storage.get({ key })
		return JSON.parse(value as string)
	},
	set: async (key: string, value: any) => {
		await Storage.set({ key, value: JSON.stringify(value) })
	},
	remove: async (key: string) => {
		await Storage.remove({ key })
	}
}
