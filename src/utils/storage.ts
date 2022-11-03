import { Preferences } from '@capacitor/preferences'

export const storage = {
	get: async (key: string) => {
		const { value } = await Preferences.get({ key })
		return JSON.parse(value as string)
	},
	set: async (key: string, value: any) => {
		await Preferences.set({ key, value: JSON.stringify(value) })
	},
	remove: async (key: string) => {
		await Preferences.remove({ key })
	}
}
