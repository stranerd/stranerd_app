import { parseURL } from '@utils/commons'
import { isAndroid, isIos } from '@utils/constants'

export const isDev = import.meta.env.VITE_ENVIRONMENT === 'local'

export const isServer = () => false
export const isClient = () => true

const googleClients = JSON.parse(import.meta.env.VITE_GOOGLE_CLIENT_IDS ?? '{}')
export const googleClientIds = {
	web: googleClients.web ?? '',
	android: googleClients.web ?? '',
	ios: googleClients.ios ?? ''
}

export const googleClientId = isIos ? googleClientIds.ios : isAndroid ? googleClientIds.android : googleClientIds.web

const host = (import.meta.env.VITE_DOMAIN ?? '') + (isDev ? `:${import.meta.env.VITE_PORT}` : '')
export const domain = parseURL(`http${!isDev ? 's' : ''}://${host}`)

export const apiBase = import.meta.env.VITE_API_BASE ?? ''
