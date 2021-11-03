import { isClient } from '@/utils/environment'
import { ref } from 'vue'

type Tokens = {
	accessToken: string | null;
	refreshToken: string | null;
}

const tokens = ref<Tokens>({
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken')
})

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.value = { accessToken, refreshToken }
	if (accessToken && refreshToken && isClient()) {
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
	}
}

export const getTokens = async (): Promise<Tokens> => tokens.value

export const deleteTokensFromCookies = async () => {
	if (isClient()) {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
	}
}
