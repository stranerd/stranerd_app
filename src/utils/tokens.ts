import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { isClient } from '@utils/environment'
import { ref } from 'vue'

type Tokens = {
	accessToken: string | null
	refreshToken: string | null
}

const tokens = ref<Tokens>({
	accessToken: localStorage.getItem(ACCESS_TOKEN_NAME),
	refreshToken: localStorage.getItem('refreshToken')
})

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.value = { accessToken, refreshToken }
	if (accessToken && refreshToken && isClient()) {
		localStorage.setItem(ACCESS_TOKEN_NAME, accessToken)
		localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken)
	}
}

export const getTokens = async (): Promise<Tokens> => tokens.value

export const deleteTokensFromCookies = async () => {
	if (isClient()) {
		localStorage.removeItem(ACCESS_TOKEN_NAME)
		localStorage.removeItem(REFRESH_TOKEN_NAME)
	}
}
