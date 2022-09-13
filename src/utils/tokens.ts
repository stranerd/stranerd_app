import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { isClient } from '@utils/environment'
import { storage } from '@utils/storage'

type Tokens = {
	accessToken: string | null
	refreshToken: string | null
}

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	if (!isClient()) return
	if (accessToken) await storage.set(ACCESS_TOKEN_NAME, accessToken)
	if (refreshToken) await storage.set(REFRESH_TOKEN_NAME, refreshToken)
}

export const getTokens = async (): Promise<Tokens> => {
	if (!isClient()) return { accessToken: null, refreshToken: null }
	const accessToken = await storage.get(ACCESS_TOKEN_NAME) ?? null
	const refreshToken = await storage.get(REFRESH_TOKEN_NAME) ?? null
	return { accessToken, refreshToken }
}

export const deleteTokens = async () => {
	if (!isClient()) return
	await storage.remove(ACCESS_TOKEN_NAME)
	await storage.remove(REFRESH_TOKEN_NAME)
}
