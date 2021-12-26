import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { isClient } from '@utils/environment'
import { ref } from 'vue'
import { storage } from '@utils/storage'

type Tokens = {
	accessToken: string | null
	refreshToken: string | null
}

const tokens = ref<Tokens>({
	accessToken: null,
	refreshToken: null
})

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.value = { accessToken, refreshToken }
	if (accessToken && refreshToken && isClient()) {
		await storage.set(ACCESS_TOKEN_NAME, accessToken)
		await storage.set(REFRESH_TOKEN_NAME, refreshToken)
	}
}

export const getTokens = async (): Promise<Tokens> => tokens.value

export const deleteTokens = async () => {
	if (isClient()) {
		await storage.remove(ACCESS_TOKEN_NAME)
		await storage.remove(REFRESH_TOKEN_NAME)
	}
}
